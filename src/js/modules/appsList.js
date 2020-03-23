import { mergeSort } from '../utils/utils';
import ModalBox from './modalBox';
import { NUMBER_OF_APPS_BY_CARD } from '../config/config';

/**
 * AppsList class, creates an object that stores a list of applications belonging to a host
 * it renders the list and handles list operations.
 */
class AppsList {
    /**
     * @param {String} id - The host name, will identify the list.
     * @param {[Object]} apps - A collection of app objects.
     */
    constructor(id, apps) {
        this.id = id;
        this.apps = apps;

        this.list = document.createElement('OL');
        this.list.classList.add('host-card__list');
        this.versionModal = new ModalBox();
    }

    /* printListItems */
    printListItems() {
        if (this.list.childNodes.length) {
            this.list.innerHTML = '';
        }

        const limit = this.apps.length < NUMBER_OF_APPS_BY_CARD ? this.apps.length : NUMBER_OF_APPS_BY_CARD;

        for (let i = 0; i < limit; i += 1) {
            const { name, apdex, version } = this.apps[i];

            const listElement = document.createElement('LI');
            listElement.classList.add('host-card__list-item');

            const apdexSpan = document.createElement('SPAN');
            apdexSpan.classList.add('host-card__apdex-index');
            apdexSpan.innerText = apdex;

            const showTooltipButton = document.createElement('BUTTON');
            showTooltipButton.classList.add('host-card__show-tooltip-button');
            showTooltipButton.type = 'button';
            showTooltipButton.addEventListener('click', () => this.versionModal.openModal(name, version));

            const appName = document.createTextNode(name);

            showTooltipButton.appendChild(appName);
            listElement.appendChild(apdexSpan);
            listElement.appendChild(showTooltipButton);
            this.list.appendChild(listElement);
        }
    }

    /*
     * renderList - Render the application list HTML elements
     * @return {Node} Html node containing the list elements.
     * */
    renderList() {
        const card = document.createElement('DIV');
        card.classList.add('host-card');
        card.id = this.id;

        const heading = document.createElement('H2');
        heading.classList.add('host-card__heading');
        heading.innerText = this.id;

        this.printListItems();

        card.appendChild(heading);
        card.appendChild(this.list);

        return card;
    }

    /**
     * addApplication - Adds a new application to the list
     * @param  {Object} newApp - data object
     * @param  {String} newApp.name - Application's name
     * @param  {number} newApp.version - Application's release
     * @param  {number} newApp.apdex - Application's apdex number
     */
    addApplication(newApp) {
        const { name, version, apdex } = newApp;
        this.apps = mergeSort([...this.apps, { name, version, apdex }], 'apdex').slice(0, NUMBER_OF_APPS_BY_CARD);
        this.printListItems();
    }

    /**
     * updateApplications - Updates the list of applications with a new sorted list
     * @param  {[Object]} apps - Array of applications data objects sorted by apdex number
     */
    updateApplications(apps) {
        this.apps = apps;
        this.printListItems();
    }

    /**
     * hasApplication - whether the list includes a given application, checking by name and version number.
     * @param  {String} appName - Name of the Application to check
     * @param  {number} appVersion - Version of the Application to check
     * @return {Boolean}
     */
    hasApplication(appName, appVersion) {
        return this.apps.some(({ name, version }) => name === appName && version === appVersion);
    }
}

export default AppsList;

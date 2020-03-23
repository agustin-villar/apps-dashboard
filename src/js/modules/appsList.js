import { mergeSort } from '../utils/utils';
import ModalBox from './modalBox';

class AppsList {
    constructor(id, apps) {
        this.id = id;
        this.apps = apps;
        this.renderLimit = 5;

        this.list = document.createElement('OL');
        this.list.classList.add('host-card__list');
        this.versionModal = new ModalBox();
    }

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

    printListItems() {
        if (this.list.childNodes.length) {
            this.list.innerHTML = '';
        }

        const limit = this.apps.length < this.renderLimit ? this.apps.length : this.renderLimit;

        for (let i = 0; i < limit; i += 1) {
            const { name, apdex, version } = this.apps[i];

            const listElement = document.createElement('LI');
            listElement.classList.add('host-card__list-item');
            listElement.dataset.release = version;

            const apdexSpan = document.createElement('SPAN');
            apdexSpan.classList.add('host-card__apdex-index');
            apdexSpan.innerText = apdex;

            const showTooltipButton = document.createElement('BUTTON');
            showTooltipButton.classList.add('host-card__show-tooltip-button');
            showTooltipButton.type = 'button';
            showTooltipButton.addEventListener('click', () => this.versionModal.openModal(version, name));

            const appName = document.createTextNode(name);

            showTooltipButton.appendChild(appName);
            listElement.appendChild(apdexSpan);
            listElement.appendChild(showTooltipButton);
            this.list.appendChild(listElement);
        }
    }

    addApplication({ name, version, apdex }) {
        const newApp = { name, version, apdex };
        this.apps = mergeSort([...this.apps, newApp], 'apdex').slice(0, 25);
        this.printListItems();
    }

    hasApplication(appName, appVersion) {
        return this.apps.some(({ name, version }) => name === appName && version === appVersion);
    }

    updateApplications(apps) {
        this.apps = apps;
        this.printListItems();
    }
}

export default AppsList;

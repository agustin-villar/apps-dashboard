import { mergeSort, removeDuplicatesFromArray } from '../utils/utils';
import AppsList from './appsList';
import ListToggle from './listToggle';

/**
 * AppsPage class, which adds the basic functionality for the Applications Page
 * Loads and handles the data to create the required objects to display it on the page
 * @param {String} username
 */
class AppsPage {
    constructor(username = '') {
        this.endpoint = 'host-app-data.json';
        this.listContainer = document.querySelector('#apps-list');
        this.userNameLabel = document.querySelector('#user-name');
        this.data = [];
        this.hostIds = [];
        this.appsLists = [];
        this.listToggle = new ListToggle();
        this.userNameLabel.innerHTML = username;
    }

    /* loadData - loads the data from the given endpoint */
    loadData() {
        fetch(this.endpoint)
            .then((response) => response.json())
            .then((data) => {
                this.data = data;
                this.createAppsLists();
            });
    }

    /* createAppsLists - creates an AppList object for each one of the available hosts */
    createAppsLists() {
        this.hostIds = this.getUniqueHostIds();

        this.hostIds.forEach((id) => {
            const appsList = new AppsList(id, this.getTopAppsByHost(id));
            this.appsLists.push(appsList);
            this.listContainer.appendChild(appsList.renderList());
        });

        this.listToggle.init();
    }

    /**
     * getUniqueHostIds - filters the data to isolate the unique hosts
     * @return {[String]} List of unique host ids
     */
    getUniqueHostIds() {
        return this.data.reduce(
            (acc, { host }) => removeDuplicatesFromArray(acc.concat(host)),
            [],
        );
    }

    /**
     * getTopAppsByHost - Given a host id, it retrieves the highest ranked apps for that host
     * @param  {String} hostname - Hostname to get the apps from
     * @param  {Number} appsAmount - Number of apps to get
     * @return {[String]} List of unique host ids
     */
    getTopAppsByHost(hostname, appsAmount = 25) {
        const apps = [];

        this.data.forEach(({ host, name, version, apdex }) => {
            if (host.includes(hostname)) {
                apps.push({ name, version, apdex });
            }
        });

        return mergeSort(apps, 'apdex').slice(0, appsAmount);
    }

    /**
     * getHostListById - Retrieves an appsList object that matches the given host it.
     * @param  {String} hostId
     * @return {Object} An AppsList object
     */
    getHostListById(hostId) {
        let appsList;

        for (let i = 0, j = this.appsLists.length; i < j; i += 1) {
            if (this.appsLists[i].id === hostId) {
                appsList = this.appsLists[i];
                break;
            }
        }

        return appsList;
    }

    /**
     * addAppToHosts - Adds a new app to the relevant host applications list
     * @param {Object} app
     * @param {String} app.name
     * @param {number} app.version
     * @param {number} app.apdex
     * @param {[String]} app.host
     */
    addAppToHosts(app) {
        const { host, name, apdex, version } = app;

        host.forEach((hostId) => {
            // If the application belongs to an existing host update the matching list
            if (this.hostIds.includes(hostId)) {
                const appsListToUpdate = this.getHostListById(hostId);
                appsListToUpdate.addApplication({ host, apdex, name, version });
            // If the host doesn't exist add a new list and update the this.hostIds list
            } else {
                const appsList = new AppsList(hostId, [{ host, apdex, name, version }]);
                this.appsLists.push(appsList);
                this.listContainer.appendChild(appsList.renderList());
                this.hostIds.push(hostId);
            }
        });
    }

    /**
     * removeAppFromHosts - Removes an app for the this.data object and update relevant applications lists
     * @param {Object} app
     * @param {String} app.name
     * @param {number} app.version
     */
    removeAppFromHosts(app) {
        const { name: appName, version: appVersion } = app;
        const appIndex = this.data.findIndex(({ name, version }) => appName === name && appVersion === version);
        this.data.splice(appIndex, 1);

        this.appsLists.forEach((appsList) => {
            // Update the applications list only if they include the app that's going to be removed
            if (appsList.hasApplication(appName, appVersion)) {
                appsList.updateApplications(this.getTopAppsByHost(appsList.id));
            }
        });
    }
}

export default AppsPage;

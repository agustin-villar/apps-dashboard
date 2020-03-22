import { mergeSort, removeDuplicatesFromArray } from '../utils/utils';
import AppsList from './appsList';

class AppsPage {
    constructor() {
        this.endpoint = 'host-app-data.json';
        this.data = [];
        this.listContainer = document.querySelector('#apps-list');
        this.hostIds = [];
        this.hostsLists = [];
    }

    createApps() {
        this.hostIds.forEach((id) => {
            const hostList = new AppsList(id, this.getTopAppsByHost(id));
            this.hostsLists.push(hostList);
            this.listContainer.appendChild(hostList.renderList());
        });

        this.removeAppFromHosts({
            name: 'Intelligent Concrete Bike - Kris - Kemmer, and Sons', version: 5,
        });
    }

    loadApps() {
        fetch(this.endpoint)
            .then((response) => response.json())
            .then((data) => {
                this.data = data;
                this.hostIds = AppsPage.getUniqueHostIds(data);
                this.createApps();
            });
    }

    static getUniqueHostIds(data) {
        const rawHosts = data.reduce(
            (acc, { host }) => acc.concat(host),
            [],
        );

        return removeDuplicatesFromArray(rawHosts);
    }

    getTopAppsByHost(hostname, appsAmount = 25) {
        const apps = [];

        this.data.forEach(({ host, name, version, apdex }) => {
            if (host.includes(hostname)) {
                apps.push({ name, version, apdex });
            }
        });

        return mergeSort(apps, 'apdex').slice(0, appsAmount);
    }

    addAppToHosts(app) {
        const { host, name, apdex, version } = app;

        host.forEach((hostId) => {
            if (this.hostIds.includes(hostId)) {
                const hostListToUpdate = this.getHostListById(hostId);
                hostListToUpdate.addApplication({ host, apdex, name });
            } else {
                const hostList = new AppsList(hostId, [{ host, apdex, name, version }]);
                this.hostsLists.push(hostList);
                this.listContainer.appendChild(hostList.renderList());
            }
        });
    }

    removeAppFromHosts(app) {
        const { name: appName, version: appVersion } = app;
        const appIndex = this.data.findIndex(({ name, version }) => appName === name && appVersion === version);
        this.data.splice(appIndex, 1);

        this.hostsLists.forEach((hostList) => {
            if (hostList.hasApplication(appName, appVersion)) {
                hostList.updateApplications(this.getTopAppsByHost(hostList.id));
            }
        });
    }

    getHostListById(hostId) {
        let hostList;

        for (let i = 0, j = this.hostsLists.length; i < j; i += 1) {
            if (this.hostsLists[i].id === hostId) {
                hostList = this.hostsLists[i];
                break;
            }
        }

        return hostList;
    }
}

export default AppsPage;

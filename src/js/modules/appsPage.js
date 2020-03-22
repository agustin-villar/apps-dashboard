import { mergeSort, removeDuplicatesFromArray } from '../utils/utils';
import AppsList from './appsList';

class AppsPage {
    constructor() {
        this.endpoint = 'host-app-data.json';
        this.data = [];
        this.listContainer = document.querySelector('#apps-list');
        this.hostIds = [];
    }

    createApps() {
        this.hostIds.forEach((id) => {
            const hostList = new AppsList(id, this.getTopAppsByHost(id));
            this.listContainer.appendChild(hostList.renderList());
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

        this.data.forEach(({
            host, name, version, apdex,
        }) => {
            if (host.includes(hostname)) {
                apps.push({ name, version, apdex });
            }
        });

        return mergeSort(apps, 'apdex').slice(0, appsAmount);
    }
}

export default AppsPage;

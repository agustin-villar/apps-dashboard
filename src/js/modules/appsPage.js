import { removeDuplicatesFromArray } from '../utils/utils';
import AppsList from './appsList';

class AppsPage {
    constructor() {
        this.data = [];
        this.endpoint = 'host-app-data.json';
        this.listContainer = document.querySelector('#apps-list');
        this.hostIds = [];
        this.hosts = [];
    }

    createApps() {
        this.hosts = this.hostIds.map((hostId) => ({ id: hostId, apps: [] }));

        this.data.forEach(({
            host, name, version, apdex,
        }) => {
            this.hosts.forEach(({ id, apps }) => {
                if (host.includes(id)) {
                    apps.push({ name, version, apdex });
                }
            });
        });

        this.hosts.forEach(({ id, apps }) => {
            const hostList = new AppsList(id, apps);
            this.listContainer.appendChild(hostList.renderList());
        });
    }

    loadApps() {
        fetch(this.endpoint)
            .then((response) => response.json())
            .then((data) => {
                this.data = data;
                this.hostIds = AppsPage.getHosts(data);
                this.createApps();
            });
    }

    static getHosts(data) {
        const rawHosts = data.reduce(
            (acc, { host }) => acc.concat(host),
            [],
        );

        return removeDuplicatesFromArray(rawHosts);
    }
}

export default AppsPage;

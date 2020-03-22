class AppsList {
    constructor(id, apps) {
        this.id = id;
        this.apps = apps.sort(AppsList.sortByApdex);
        this.renderLimit = 5;
    }

    renderList() {
        const card = document.createElement('DIV');
        card.classList.add('host-card');
        card.id = this.id;

        const heading = document.createElement('H2');
        heading.classList.add('host-card__heading');
        heading.innerText = this.id;

        const list = document.createElement('OL');
        list.classList.add('host-card__list');

        for (let i = 0; i < this.renderLimit; i += 1) {
            const { name, apdex, version } = this.apps[i];

            const listElement = document.createElement('LI');
            listElement.classList.add('host-card__list-item');
            listElement.dataset.release = version;

            const apdexSpan = document.createElement('SPAN');
            apdexSpan.classList.add('host-card__apdex-index');
            apdexSpan.innerText = apdex;

            const appName = document.createTextNode(name);

            listElement.appendChild(apdexSpan);
            listElement.appendChild(appName);
            list.appendChild(listElement);
        }

        card.appendChild(heading);
        card.appendChild(list);

        return card;
    }

    static sortByApdex({ apdex: apdexA }, { apdex: apdexB }) {
        return apdexB - apdexA;
    }
}

export default AppsList;

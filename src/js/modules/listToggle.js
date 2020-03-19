class ListToggle {
    constructor() {
        this.listModeClass = 'list-container--list-mode';
        this.listElement = null;
        this.checkbox = null;
    }

    onListToggleClick(e) {
        e.stopPropagation();

        if (this.checkbox.checked) {
            this.listElement.classList.remove(this.listModeClass);
            return;
        }

        this.listElement.classList.add(this.listModeClass);
    }

    init() {
        this.checkbox = document.querySelector('.page-header__list-mode-toggle__input');
        this.listElement = document.querySelector('.list-container');
        this.checkbox.addEventListener('click', (e) => { this.onListToggleClick(e); });
    }
}

export default ListToggle;

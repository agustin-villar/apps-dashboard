class ListToggle {
    constructor() {
        this.listModeClass = 'list-container--list-mode';
        this.checkbox = document.querySelector('.page-header__list-mode-toggle__input');
        this.listElement = document.querySelector('.list-container');
        this.checkbox.addEventListener('click', (e) => this.onListToggleClick(e));
    }

    onListToggleClick(e) {
        e.stopPropagation();

        if (this.checkbox.checked) {
            this.listElement.classList.remove(this.listModeClass);
            return;
        }

        this.listElement.classList.add(this.listModeClass);
    }

    init(checked = true) {
        this.checkbox.checked = checked;
    }
}

export default ListToggle;

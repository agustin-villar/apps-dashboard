/**
 * ListToggle class, creates an ui component that switches the list display mode.
 */
class ListToggle {
    constructor() {
        this.listModeClass = 'list-container--list-mode';
        this.checkbox = document.querySelector('.page-header__list-mode-toggle__input');
        this.listElement = document.querySelector('.list-container');
        this.checkbox.addEventListener('click', (e) => this.onListToggleClick(e));
    }

    onListToggleClick(e) {
        e.stopPropagation();
        this.updateListMode(this.checkbox.checked);
    }

    /*
     * Updates the list container css classes to activate the display mode accordingly
     * Sets local storage `gridMode` to save the user's configuration for future visits.
     * @param  {Boolean} setGridMode - when true gridMode will be activated.
     */
    updateListMode(setGridMode) {
        localStorage.setItem('gridMode', setGridMode);

        if (!setGridMode) {
            this.listElement.classList.add(this.listModeClass);
            return;
        }

        this.listElement.classList.remove(this.listModeClass);
    }

    /*
     * Sets the initial state of the list, either from the default configuration or
     * from a previously stored setting on local storage.
     * @param  {Boolean} checked - sets if the toogle is checked for grid mode at initial state
     */
    init(checked = true) {
        let userSetDisplayMode = false;

        if (typeof localStorage.getItem('gridMode') !== 'object') {
            userSetDisplayMode = true;
        }

        this.checkbox.checked = userSetDisplayMode ? localStorage.getItem('gridMode') === 'true' : checked;
        this.updateListMode(this.checkbox.checked);
    }
}

export default ListToggle;

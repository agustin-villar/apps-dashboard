/**
 * ModalBox class, creates a modal like component that renders the title and a version number for
 * and application. It will be displayed over the main html content as an overlay.
 */
class ModalBox {
    constructor() {
        this.element = document.querySelector('#modal');
        this.closeButton = document.querySelector('#close-modal');
        this.titleNode = document.querySelector('#modal-title');
        this.versionNode = document.querySelector('#modal-text');
        this.closeButton.addEventListener('click', () => this.closeModal());
    }

    closeModal() {
        this.element.classList.remove('modal--open');
    }

    /**
     * Shows the modal and update its content.
     * @param  {String} version - Version number of the app that triggers the modal
     * @param  {String} title - Title of the application that triggers the modal
     */
    openModal(title, version) {
        this.titleNode.innerHTML = title;
        this.versionNode.innerHTML = version;
        this.element.classList.add('modal--open');
    }
}

export default ModalBox;

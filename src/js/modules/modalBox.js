/**
 * ModalBox class, creates a modal like component that renders a title and a description text
 * It will be displayed over the main html content as an overlay.
 */
class ModalBox {
    constructor() {
        this.element = document.querySelector('#modal');
        this.closeButton = document.querySelector('#close-modal');
        this.titleNode = document.querySelector('#modal-title');
        this.textNode = document.querySelector('#modal-text');
        this.closeButton.addEventListener('click', () => this.closeModal());
    }

    closeModal() {
        this.element.classList.remove('modal--open');
    }

    openModal(text, title) {
        this.textNode.innerHTML = text;
        this.titleNode.innerHTML = title;
        this.element.classList.add('modal--open');
    }
}

export default ModalBox;

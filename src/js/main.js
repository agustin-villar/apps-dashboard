import ListToggle from './modules/listToggle';

const myToggle = new ListToggle();

function startMeUp() {
    myToggle.init();
}

window.addEventListener('load', startMeUp);

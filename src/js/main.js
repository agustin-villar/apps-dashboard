import ListToggle from './modules/listToggle';
import AppsPage from './modules/appsPage';

const myToggle = new ListToggle();
const appsPage = new AppsPage();

function startMeUp() {
    myToggle.init();
    appsPage.loadApps();
}

window.addEventListener('load', startMeUp);

import AppsPage from './modules/appsPage';

const appsPage = new AppsPage();

function startMeUp() {
    appsPage.loadApps();
}

window.addEventListener('load', startMeUp);

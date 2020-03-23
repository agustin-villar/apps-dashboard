import AppsPage from './modules/appsPage';

const appsPage = new AppsPage();

/* entry point */
window.addEventListener('load', () => appsPage.loadData());

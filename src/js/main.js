import AppsPage from './modules/appsPage';

const appsPage = new AppsPage('amauro85@gmail.com');

/* entry point */
window.addEventListener('load', () => appsPage.loadData());

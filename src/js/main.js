import Company from './modules/company';

const myCompany = new Company('my great company');

function startMeUp() {
    myCompany.start();
}

window.addEventListener('load', startMeUp);

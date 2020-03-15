class Company {
    constructor(name = '') {
        this.name = name;
        console.log(this.name);
    }

    start() {
        alert(this.name);
    }
}

export default Company;

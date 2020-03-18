class Company {
    constructor(name = '') {
        this.name = name;
        console.log(this.name);
    }

    start() {
        console.log(this.name);
    }
}

export default Company;

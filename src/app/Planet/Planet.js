const db = require('../db');
const { genericRequest } = require('../swapiFunctions/')

class Planet {
    constructor(id){
        this.id = id;
    }

    async init(){
        let planet = await this.getPlanet()
        if(!planet){
            planet = await this.getPlanetSWAIP()
        }

        this.name = planet.name;
        this.gravity = planet.gravity;
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }

    async getPlanet() {
        return await db.swPlanet.findOne({
            where: { 
                id: this.id
            }
        })
    }

    async getPlanetSWAIP(){
        const { name, gravity } = await genericRequest(`https://swapi.dev/api/planets/${this.id}`, "GET");
        return { name, gravity: gravity !== "N/A" ? parseFloat(gravity.split(" ")[0]) : 0.0}
    }
}

module.exports = Planet;
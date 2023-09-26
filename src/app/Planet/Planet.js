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
        try{
            return await db.swPlanet.findOne({
                where: { 
                    id: this.id
                }
            })
        } catch (e){
            return { status: 500, message: "There was an error with the databases"};
        }
    }

    async getPlanetSWAIP(){
        try {
            const { name, gravity } = await genericRequest(`https://swapi.dev/api/planets/${this.id}`, "GET");
            return { name, gravity: gravity !== "N/A" ? parseFloat(gravity.split(" ")[0]) : 0.0}
        } catch (e) {
            return { status: 500, message: "There was an error with the databases"};
        }
    }
}

module.exports = Planet;
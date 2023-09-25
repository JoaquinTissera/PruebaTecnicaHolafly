const db = require('../db');
const { genericRequest } = require('../swapiFunctions/')

class Planet {
    constructor(id){
        this.id = id;
    }

    async init(){
        const planet = await this.getPlanet()

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
}

module.exports = Planet;
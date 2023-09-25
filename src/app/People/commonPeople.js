const db = require('../db');
const AbstractPeople = require('./abstractPeople')

class CommonPeople extends AbstractPeople {
    constructor(id){
        super()
        this.id = id
    }

    async init(){
        let people = await this.getPeople()
        if(!people){
            people = {};
        }

        this.name = people.name;
        this.mass = people.mass;
        this.height = people.height;
        this.homeworld_name = people.homeworld_name;
        this.homeworld_id = people.homeworld_id;
    }

    async getPeople(){
        return await db.swPeople.findOne({
            where: { 
                id: this.id
            }
        })
    }
}

module.exports = CommonPeople;
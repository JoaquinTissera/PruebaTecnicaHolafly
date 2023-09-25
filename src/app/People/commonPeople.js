const db = require('../db');
const AbstractPeople = require('./abstractPeople')
const { genericRequest } = require('../swapiFunctions/')

class CommonPeople extends AbstractPeople {
    constructor(id){
        super()
        this.id = id
    }

    async init(){
        let people = await this.getPeople();
        if(!people){
            people = await this.getPeopleSWAIP();
            console.log(people)
            console.log(this.id)
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

    async getPeopleSWAIP(){
        const { name, mass, height, homeworld} = await genericRequest(`https://swapi.dev/api/people/${this.id}`, "GET");
        const { name: homeworld_name} = await genericRequest(homeworld, "GET");
        return { name, mass, height, homeworld_name, homeworld_id: homeworld.split("/")[5]};
    }
}

module.exports = CommonPeople;
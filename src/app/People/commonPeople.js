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
        }

        this.name = people.name;
        this.mass = people.mass;
        this.height = people.height;
        this.homeworldName = people.homeworld_name;
        this.homeworlId = people.homeworld_id;
    }

    async getPeople(){
        try{
            return await db.swPeople.findOne({
                where: { 
                    id: this.id
                }
            })
        } catch (e){
            return { status: 500, message: "There was an error with the databases"};
        }
    }

    async getPeopleSWAIP(){
        try {
            const { name, mass, height, homeworld} = await genericRequest(`https://swapi.dev/api/people/${this.id}`, "GET");
            const { name: homeworld_name} = await genericRequest(homeworld, "GET");
            return { name, mass, height, homeworld_name, homeworld_id: "/planets/" + homeworld.split("/")[5] };
        } catch (e) {
            return { status: 500, message: "There was an error with the api SWAPI"};
        }
    }
}

module.exports = CommonPeople;
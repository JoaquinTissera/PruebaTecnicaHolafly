const AbstractPeople = require('./abstractPeople')
const { genericRequest } = require('../swapiFunctions/')

class WookieePeople extends AbstractPeople {
    constructor(id){
        super()
        this.id = id
    }

    async init(){
        const people = await this.getPeopleSWAIPInWookiee();

        this.name = people.name;
        this.mass = people.mass;
        this.height = people.height;
        this.homeworldName = people.homeworld_name;
        this.homeworlId = people.homeworld_id;
    }

    async getPeopleSWAIPInWookiee(){
        try { 
            const { whrascwo: name, scracc: mass, acwoahrracao: height, acooscwoohoorcanwa: homeworld} = await genericRequest(`https://swapi.dev/api/people/${this.id}?format=wookiee`, "GET");
            const homeworld_id = homeworld.split("/")[5];
            const { whrascwo: homeworld_name} = await genericRequest(`https://swapi.dev/api/planets/${homeworld_id}?format=wookiee`, "GET");
            return { name, mass, height, homeworld_name, homeworld_id: "/planets/" + homeworld_id }
        } catch (e) {
            return { status: 500,  status: 500, message: "There was an error with the api SWAPI"}
        }
    }
}

module.exports = WookieePeople;
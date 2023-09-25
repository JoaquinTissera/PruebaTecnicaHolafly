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
        this.homeworld_name = people.homeworld_name;
        this.homeworld_id = people.homeworld_id;
    }

    async getPeopleSWAIPInWookiee(){
        const { whrascwo: name, scracc: mass, acwoahrracao: height, acooscwoohoorcanwa: homeworld} = await genericRequest(`https://swapi.dev/api/people/${this.id}?format=wookiee`, "GET");
        const homeworld_id = homeworld.split("/")[5];
        const { whrascwo: homeworld_name} = await genericRequest(`https://swapi.dev/api/planets/${homeworld_id}?format=wookiee`, "GET");
        return { name, mass, height, homeworld_name, homeworld_id: homeworld_id};
    }

}

module.exports = WookieePeople;
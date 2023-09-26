const db = require('./db');
const swapiFunctions = require('./swapiFunctions')
const { peopleFactory } = require('./People')
const { planetFactory } = require('./Planet')

const getWeightOnPlanet = async (planetId, peopleId) => {
    const people = await peopleFactory(peopleId);
    if( people.getHomeworlId() === "/planets/" + planetId){
        throw new Error('Is trying to calculate the weight of a character on his home planet.'); 
    }
    const planet = await planetFactory(planetId);
    return swapiFunctions.getWeightOnPlanet(people.getMass(), planet.getGravity());
}

module.exports = {
    db,
    swapiFunctions,
    peopleFactory,
    planetFactory,
    getWeightOnPlanet
}
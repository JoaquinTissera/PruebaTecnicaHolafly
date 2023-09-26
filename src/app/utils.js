const { peopleFactory } = require('./People')
const { planetFactory } = require('./Planet')
const { getWeightOnPlanet } = require('./swapiFunctions')

const getWeight = async (planetId, peopleId) => {
    const people = await peopleFactory(peopleId);
    if( people.getHomeworlId() === "/planets/" + planetId){
        return { status: 500, message: 'Is trying to calculate the weight of a character on his home planet.' }
    }
    const planet = await planetFactory(planetId);
    return getWeightOnPlanet(people.getMass(), planet.getGravity());
}

module.exports = getWeight;
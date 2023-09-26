const db = require('./db');
const swapiFunctions = require('./swapiFunctions')
const { peopleFactory } = require('./People')
const { planetFactory } = require('./Planet')
const getWeightOnPlanet = require('./utils')

module.exports = {
    db,
    swapiFunctions,
    peopleFactory,
    planetFactory,
    getWeightOnPlanet
}
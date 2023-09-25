const db = require('./db');
const swapiFunctions = require('./swapiFunctions')
const { peopleFactory } = require('./People')

module.exports = {
    db,
    swapiFunctions,
    peopleFactory
}
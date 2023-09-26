const { peopleFactory, planetFactory, getWeightOnPlanet } = require('../../app/')
const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        const lang = _isWookieeFormat(req) ? "wookiee" : "normal"
        const people = await peopleFactory(req.params.id, lang)
        if ( people.message) { 
            res.status(people.status).json({ message: people.message })
            return;
        }
        res.status(200).json(people);
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const planet = await planetFactory(req.params.id)
        if ( planet.message) { 
            res.status(planet.status).json({ message: planet.message })
            return;
        }
        res.status(200).json(planet);
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        const weight = await getWeightOnPlanet(req.query.planetId, req.query.peopleId);
        if ( weight.message)  { 
            res.status(weight.status).json({ message: weight.message })
            return;
        }
        res.status(200).json({ weight });
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;
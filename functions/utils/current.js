const api = require('covidapi');

const getYesterdayData = async (req, res, next) => {
    try {
        const yesterday = api.yesterday.all()
            // .then()
        req.yesterdayData = await yesterday;
        next()
    } catch (e) {
        console.error({e})
        res({error: e, res})
    }
}

const getCurrentCountries = async (req, res, next) => {
    const currentData = api.yesterday.countries({sort:'cases'})
    // .then()
    req.countryData = await currentData;
    next()
}

module.exports = {getYesterdayData, getCurrentCountries}
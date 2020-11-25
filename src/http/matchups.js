import fetch from 'node-fetch';
import { mockFetchData, writeMockData } from './mockUtils';

const httpFetchMatchups = async () => {
    const weeks = 13;
    const matchups = {};
    for (var i = 1; i <= weeks; ++i) {
        const url = `https://api.sleeper.app/v1/league/${process.env.LEAGUE_ID}/matchups/${i}`;
        const response = await fetch(url);
        const matchup = await response.json();
        matchups[i] = matchup;
    }
    if (process.env.NODE_ENV === 'WRITE_MOCKS') { writeMockData(matchups, 'matchups') }
    return matchups;
};

const fetchMatchups = async (useHttp) => {
    return useHttp
        ? await httpFetchMatchups()
        : mockFetchData('matchups');
};

module.exports = {
    fetchMatchups
}

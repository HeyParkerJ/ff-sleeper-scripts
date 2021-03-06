import fetch from 'node-fetch';
import { mockFetchData, writeMockData } from './mockUtils';

const httpFetchMatchups = async (writeMocks) => {
    const weeks = 13;
    const matchups = {};
    for (var i = 1; i <= weeks; ++i) {
        const url = `https://api.sleeper.app/v1/league/${process.env.LEAGUE_ID}/matchups/${i}`;
        const response = await fetch(url);
        const matchup = await response.json();
        matchups[i] = matchup;
    }
    if (writeMocks) { writeMockData(matchups, 'matchups') }
    return matchups;
};

const fetchMatchups = async (useHttp, writeMocks) => {
    return useHttp
        ? await httpFetchMatchups(writeMocks)
        : mockFetchData('matchups');
};

module.exports = {
    fetchMatchups
}

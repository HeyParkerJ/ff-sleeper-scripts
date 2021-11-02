import fetch from 'node-fetch';
import { mockFetchData, writeMockData } from './mockUtils';

const httpFetchRosters = async (writeMocks, leagueID) => {
    const url = `https://api.sleeper.app/v1/league/${leagueID}/rosters/`;
    const response = await fetch(url);
    const rostersData = await response.json();
    const rosters = rostersData.reduce((acc, d) => {
        const key = d['roster_id']
        acc[key] = d;
        return acc;
    }, {})
    if (writeMocks) { writeMockData(rosters, 'rosters') }
    return rosters;
};

const fetchRosters = async (useHttp, writeMocks, leagueID) => {
    return useHttp
        ? await httpFetchRosters(writeMocks, leagueID)
        : mockFetchData('rosters');
};

module.exports = {
    fetchRosters
}

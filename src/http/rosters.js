import fetch from 'node-fetch';
import { mockFetchData, writeMockData } from './mockUtils';

const httpFetchRosters = async (writeMocks) => {
    const url = `https://api.sleeper.app/v1/league/${process.env.LEAGUE_ID}/rosters/`;
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

const fetchRosters = async (useHttp, writeMocks) => {
    return useHttp
        ? await httpFetchRosters(writeMocks)
        : mockFetchData('rosters');
};

module.exports = {
    fetchRosters
}

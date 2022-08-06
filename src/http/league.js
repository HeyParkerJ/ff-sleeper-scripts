import fetch from 'node-fetch';
import { mockFetchData, writeMockData } from './mockUtils';

const httpFetchLeague = async (writeMocks, leagueID) => {
  const url = `https://api.sleeper.app/v1/league/${leagueID}`;
  const response = await fetch(url);
  const league = await response.json();
  if (writeMocks) { writeMockData(league, 'league') }
  return league;
};

const fetchLeague = async (useHttp, leagueID, writeMocks) => {
  return useHttp
    ? await httpFetchLeague(writeMocks, leagueID)
    : mockFetchData('league');
};

module.exports = {
  fetchLeague
}

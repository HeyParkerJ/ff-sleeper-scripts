import 'dotenv/config';
import { fetchMatchups, fetchRosters, fetchUsers } from './http/index';
import { performScoreCalculations, performCsvExportCalculations } from './calculations'
import express from 'express';
import cors from 'cors';

const useHttp = process.env.NODE_ENV === 'WRITE_MOCKS'
  || process.env.NODE_ENV === 'PROD'
  ? true
  : false;

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
// TODO - Use streams?
// const dest = fs.createWriteStream('./octocat.png');
// res.body.pipe(dest);

const app = express();
app.use(cors());

app.get('/isAlive', (req, res) => {
  res.send(true);
});

app.get('/stats/scores/:season', async (req, res) => {
  const season = req.params.season;
  const leagueID = convertSeasonToLeagueID(season)
  const data = await fetchData(useHttp, false, leagueID);
  const result = doCalculations(data);
  res.send(result);
})

app.get('/csv/:season', async (req, res) => {
  const season = req.params.season;
  const leagueID = convertSeasonToLeagueID(season)
  const data = await fetchData(useHttp, false, leagueID);
  const result = performCsvExportCalculations(season, data);
  res.send(result);
})

const convertSeasonToLeagueID = (season) => {
  const seasonToLeagueIDAssociation = {
    2020: '603631612793520128',
    2021: '687728692536893440'
  }
  const leagueID = seasonToLeagueIDAssociation[season]
  if(!leagueID) {
    throw new Error(`No leagueID found for season ${season}`)
  }
  return leagueID
}

const fetchData = async (useHttp, writeMocks, leagueID) => {
  const matchups = await fetchMatchups(useHttp, writeMocks, leagueID);
  const rosters = await fetchRosters(useHttp, writeMocks, leagueID);
  const users = await fetchUsers(useHttp, writeMocks, leagueID);

  return {
    matchups: matchups,
    rosters: rosters,
    users: users,
  };
};

const doCalculations = (data) => {
  const scoreCalculations = performScoreCalculations(data);
  return scoreCalculations;
};



app.listen(process.env.PORT, () => {
  console.log('Listening on 3001 now')
})

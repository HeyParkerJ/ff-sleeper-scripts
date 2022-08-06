import 'dotenv/config';
import { fetchMatchups, fetchRosters, fetchUsers, fetchLeague } from './http/index';
import { performScoreCalculations } from './calculations'
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
app.use((error, req, res, next) => {
  return res.status(500).json({ error: error.toString() });
});
app.get('/isAlive', (req, res) => {
  res.send(true);
});

const transformSeasonToLeagueId = (season) => {
  switch (season) {
    case '2020':
      return '603631612793520128';
    case '2021':
      return '687728692536893440';
    case '2022':
      return '852771702776672256';
    default:
      throw new Error('unsupported season supplied to transformSeasonToLeagueID')
  }
}

app.get('/api/scores/:season', async (req, res) => {
  const season = req.params.season
  const leagueID = transformSeasonToLeagueId(season)
  const data = await fetchData(useHttp, leagueID, false);
  const result = doCalculations(data);
  res.send(result);
})

const fetchData = async (useHttp, leagueID, writeMocks) => {
  const leagueData = await fetchLeague(useHttp, leagueID, writeMocks);
  const weeksOfRegularSeason = leagueData.settings.playoff_week_start - 1;
  const matchups = await fetchMatchups(useHttp, leagueID, weeksOfRegularSeason, writeMocks);
  const rosters = await fetchRosters(useHttp, leagueID, writeMocks);
  const users = await fetchUsers(useHttp, leagueID, writeMocks);

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

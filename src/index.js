import 'dotenv/config';
import { fetchMatchups, fetchRosters, fetchUsers } from './http/index';
import { calculateAveragePFPerOutcome } from './calculations'
import express from 'express';
import cors from 'cors';

const useHttp = process.env.NODE_ENV === 'WRITE_MOCKS'
  || process.env.NODE_ENV === 'PROD'
  ? true
  : false;

// TODO - Use streams?
// const dest = fs.createWriteStream('./octocat.png');
// res.body.pipe(dest);

const app = express();
app.use(cors());

app.get('/isAlive', (req, res) => {
  res.send(true);
});

app.get('/stats/averagePFPerOutcome', async (req, res) => {
  const data = await fetchData(useHttp, false);
  const result = doCalculations(data);
  res.send(result);
})

const fetchData = async (useHttp, writeMocks) => {
  const matchups = await fetchMatchups(useHttp, writeMocks);
  const rosters = await fetchRosters(useHttp, writeMocks);
  const users = await fetchUsers(useHttp, writeMocks);

  return {
    matchups: matchups,
    rosters: rosters,
    users: users,
  };
};

const doCalculations = (data) => {
  const averagePFPerOutcome = calculateAveragePFPerOutcome(data);
  return averagePFPerOutcome;
};



app.listen(process.env.PORT, () => {
  console.log('Listening on 3000 now')
})

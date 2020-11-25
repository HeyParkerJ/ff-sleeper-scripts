import 'dotenv/config';
import { fetchMatchups, fetchRosters } from './http/index';

const useHttp = process.env.NODE_ENV === 'WRITE_MOCKS' ? true : false;

// const dest = fs.createWriteStream('./octocat.png');
// res.body.pipe(dest);

const init = async () => {
  console.log('Initializing!');

  const matchups = await fetchMatchups(useHttp);
  const rosters = await fetchRosters(useHttp);

  const data = {
    matchups: matchups,
    rosters: rosters,
  }
  console.log('got all data!!')
  doCalculations(data);
};

const doCalculations = (data) => {
  const averageScorePerLoss = calculateAverageScorePerLoss(data);
  console.log('AverageScorePerLoss:', averageScorePerLoss)
};

const calculateAverageScorePerLoss = (matchupData) => {
  const createMatchupsArray = (input) => {
    return input.map((i) => {
      return {
        roster_id: i.roster_id,
        points: parseFloat(i.points).toFixed(2),
        matchup_id: i.matchup_id,
      };
    });
  };

  const matchupsArray = createMatchupsArray(matchupData);
};

const replaceRosterIdWithPlayerName = () => { };
init();

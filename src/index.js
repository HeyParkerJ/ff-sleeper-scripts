import 'dotenv/config';
import { fetchMatchups, fetchRosters } from './http/index';

const useHttp = process.env.NODE_ENV === 'WRITE_MOCKS' ? true : false;

// const dest = fs.createWriteStream('./octocat.png');
// res.body.pipe(dest);

const init = async () => {
  console.log('Initializing!');

  const matchups = await fetchMatchups(useHttp);
  const rosters = await fetchRosters(useHttp);
  console.log('got all data!!')
  // const rosters = await fetchRosters();
  //doCalculations(matchups);
};

const doCalculations = (data) => {
  const averageScorePerLoss = calculateAverageScorePerLoss(data);
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
  console.log(matchupsArray);
};

const replaceRosterIdWithPlayerName = () => { };
init();

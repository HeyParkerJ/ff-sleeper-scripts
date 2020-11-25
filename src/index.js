import 'dotenv/config';
import { fetchMatchups, fetchRosters, fetchUsers } from './http/index';

const useHttp = process.env.NODE_ENV === 'WRITE_MOCKS' ? true : false;

// const dest = fs.createWriteStream('./octocat.png');
// res.body.pipe(dest);

const init = async () => {
  console.log('Initializing!');

  const matchups = await fetchMatchups(useHttp);
  const rosters = await fetchRosters(useHttp);
  const users = await fetchUsers(useHttp);

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

const calculateAverageScorePerLoss = ({ matchups, rosters }) => {
  // TODO move this to a util file
  const allIndiciesOf = (array, element, increment) => {
    var indices = [];
    var idx = array.indexOf(element);
    while (idx != -1) {
      if (increment) {
        indices.push(idx + 1)
      } else {
        indices.push(idx);
      }
      idx = array.indexOf(element, idx + 1);
    }
    return indices;
  }

  const results = [];
  for (const rosterId in rosters) {
    const roster = rosters[rosterId];
    const record = roster.metadata.record;
    const weeksLost = allIndiciesOf(record.split(''), 'L', true);
    const totalScored = weeksLost.reduce((acc, week) => {
      acc = acc + matchups[week][0].points;
      return acc;
    }, 0)

    const averageScorePerLoss = totalScored / weeksLost.length;
    results.push({ roster_id: rosterId, averageScorePerLoss: averageScorePerLoss })
  }

  const prettifiedResults = replaceRosterIdWithPlayerName(results);
  return prettifiedResults;
};

/*
 * Needs an array of objects with a rosterId: roster_id field
 */
const replaceRosterIdWithPlayerName = (arr) => {
  return arr;
  // arr.map((a) => {

  // })
};
init();

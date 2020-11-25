import 'dotenv/config';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// const dest = fs.createWriteStream('./octocat.png');
// res.body.pipe(dest);

const init = async () => {
  console.log('Initializing!');
  const httpFetchMatchups = async () => {
    const weeks = 13;
    const matchups = {};
    for (var i = 1; i <= weeks; ++i) {
      const url = `https://api.sleeper.app/v1/league/${process.env.LEAGUE_ID}/matchups/${i}`;
      const response = await fetch(url);
      const matchup = await response.json();
      matchups[i] = matchup;
    }
    if (process.env.NODE_ENV === 'WRITE_MOCKS') {
      fs.writeFileSync(
        path.resolve(__dirname, 'mocks/matchups.json'),
        JSON.stringify(matchups),
      );
    }
    return matchups;
  };
  const mockFetchMatchups = () => {
    const data = fs.readFileSync(
      path.resolve(__dirname, 'mocks/matchups.json'),
      'utf-8',
    );
    const jsonData = JSON.parse(data);
    return jsonData;
  };
  const fetchMatchups = async () => {
    return process.env.NODE_ENV === 'PROD' ||
      process.env.NODE_ENV === 'WRITE_MOCKS'
      ? await httpFetchMatchups()
      : mockFetchMatchups();
  };

  const matchups = await fetchMatchups();
  // doCalculations(matchups);
};

const doCalculations = (data) => {
  const averageScorePerLoss = calculateAverageScorePerLoss(data);
};

const calculateAverageScorePerLoss = (data) => {
  const createMatchupsArray = (input) => {
    return input.map((i) => {
      return {
        roster_id: i.roster_id,
        points: parseFloat(i.points).toFixed(2),
        matchup_id: i.matchup_id,
      };
    });
  };

  const matchupsArray = createMatchupsArray(data);
  console.log(matchupsArray);
};

const replaceRosterIdWithPlayerName = () => {};
init();

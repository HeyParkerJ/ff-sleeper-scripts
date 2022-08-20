const doCSVCalculations = ({ matchups, rosters, users }, season) => {
  // const results = [];
  // const matchupWeeks = Object.keys(matchups);
  // for (const weekOfMatchups in matchupWeeks) {
  //   const resultsPerMatchupId = {};
  //   const matchupObject = { season: season, week: weekOfMatchups };
  //   const matchupsInThisWeek = matchups[weekOfMatchups];
  //   matchupsInThisWeek.forEach((m) => {
  //     if (!resultsPerMatchupId[m.matchup_id]) {
  //       const bothMatchups = m.filter(
  //         (m2) => m.matchup_id === m2.matchup_id,
  //       );
  //       resultsPerMatchupId[m.matchup_id] = bothMatchups;
  //     }
  //   });
  //   console.log(resultsPerMatchupId);
  // }
};

module.exports = {
  doCSVCalculations,
};

import { allIndiciesOf, standardDeviation } from './dataUtils';
import { replaceUserIdWithTeamName, makeNumbersDisplayReady } from './displayUtils';

const performScoreCalculations = ({ matchups, rosters, users }) => {
    const results = [];
    for (const rosterId in rosters) {
        const roster = rosters[rosterId];
        const record = roster.metadata.record;
        const userId = roster.owner_id;
        const scoresObject = createScoresObject(matchups, rosterId, record);

        results.push(
            {
                userId: userId,
                ...scoresObject
            }
        )
    }

    let prettifiedResults = replaceUserIdWithTeamName(results, users);
    prettifiedResults = makeNumbersDisplayReady(prettifiedResults);
    return prettifiedResults;
};

const createScoresObject = (matchups, rosterId, record) => {
    const winLossArray = record.split('');
    const weeksLost = allIndiciesOf(winLossArray, 'L', true);
    const weeksWon = allIndiciesOf(winLossArray, 'W', true);
    const weeksTied = allIndiciesOf(winLossArray, 'T', true);
    let totalScoreInWins = 0;
    let totalScoreInLosses = 0;
    let scoreInTies = 0;
    let totalScore = 0;
    const scoresArray = [];

    for (const week in matchups) {
        matchups[week].forEach((m) => {
            if (m.roster_id != rosterId || // Yes I am using fancy string coersion. I shouldn't, though.
                !m.points) {
                return;
            }
            /* Helper variables */
            const weekInt = Number.parseInt(week);
            const points = m.points;

            /* Things we can do unconditionally */
            totalScore += points;
            scoresArray.push(points);

            /* Conditional calculations */
            if (weeksWon.includes(weekInt)) {
                totalScoreInWins += points;
            } else if (weeksLost.includes(weekInt)) {
                totalScoreInLosses += points;
            } else if (weeksTied.includes(weekInt)) {
                scoreInTies += points;
            }
        })
    }
    const lossCount = weeksLost.length;
    const winCount = weeksWon.length;
    const tieCount = weeksTied.length;
    const weeksCompletedCount = winLossArray.length;
    const standardDev = standardDeviation(scoresArray);

    /* Keep calculations that show conditionally in separate objects and merge later based on display order */
    const tieCalculations = {
        totalScoreInTies: scoreInTies ? scoreInTies : undefined,
        tieCount: scoreInTies ? tieCount : undefined,
        averagePFPerTie: scoreInTies ? Number.parseFloat(scoreInTies / tieCount) : undefined,
    }
    const PFPerResultCalculations = {
        totalScoreInWins,
        averagePFPerWin: Number.parseFloat(totalScoreInWins / winCount),
        winCount,
        weeksWon,
        weeksLost,
        totalScoreInLosses,
        averagePFPerLoss: Number.parseFloat(totalScoreInLosses / lossCount),
        lossCount,
        ...tieCalculations,
        totalScore,
        averageScore: totalScore / weeksCompletedCount,
        standardDeviation: standardDev,
        scores: scoresArray,
    }

    return PFPerResultCalculations;
}

// season,week,owner,opponent,win/loss,score
const performCsvExportCalculations = (season, { matchups, rosters, users }) => {
    const results = [];
    for (const rosterId in rosters) {
        const roster = rosters[rosterId];
        const userId = roster.owner_id;
        const csvExportObject = createCsvExportObject(season, matchups, rosterId);

        results.push(
            {
                userId: userId,
                ...scoresObject
            }
        )
    }
    
}

/* A matchup. In a 10 man leauge, there are 10 matchups per week.
 [
  {
    "starters": ["421", "4035", "3242", "2133", "2449", "4531", "2257", "788", "PHI"],
    "roster_id": 1,
    "players": ["1352", "1387", "2118", "2133", "2182", "223", "2319", "2449", "3208", "4035", "421", "4881", "4892", "788", "CLE"],
    "matchup_id": 2,
    "points": 20.0 // total points for team based on league settings
    "custom_points": null // if commissioner overrides points manually
  },
  ...
]
 */
const createCsvExportObject = (season, matchups, rosterId) => {
    for (const week in matchups) {
        matchups[week].forEach((matchup) => {
            if (matchup.roster_id != rosterId || // Yes I am using fancy string coersion. I shouldn't, though.
                !matchup.points) {
                return;
            }
            /* Helper variables */
            const weekInt = Number.parseInt(week);
            const points = matchup.points;
            console.log('matchup', matchup)

            createCsvExportRowObject(season, weekInt, rosterId, opponentId)
        })
    }
}

const createCsvExportRowObject = (season, matchupWeek, rosterId, opponentId, isWinner, pointsFor, pointsAgainst) => {
    return {
        season: season,
        matchupWeek: matchupWeek,
        userId: userId,
        opponentId: opponentId,
        isWinner:isWinner,
        pointsFor: pointsFor,
        pointsAgainst: pointsAgainst

    }
}

const loopManagers = (rosters, fn) => {
    for (const rosterId in rosters) {
        const roster = rosters[rosterId];
        fn();
    }
}

const doLoops = () => {
    loopWeeks(matchups, loopManagers(rosters, ))
}

const loopWeeks = (matchups, fn) => {
    for (const week in matchups) {
        matchups[week].forEach((matchup) => {
            if (matchup.roster_id != rosterId || // Yes I am using fancy string coersion. I shouldn't, though.
                !matchup.points) {
                return;
            }
            return fn() 
        })
    }
}

module.exports = {
    performScoreCalculations,
    performCsvExportCalculations
}

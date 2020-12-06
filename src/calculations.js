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

module.exports = {
    performScoreCalculations
}

import { allIndiciesOf } from './dataUtils';
import { replaceUserIdWithTeamName, makeNumbersDisplayReady } from './displayUtils';

const createWinLossObj = (record) => {
    const winLossArray = record.split('');
    return {
        winLossArray: winLossArray,
        weeksLost: allIndiciesOf(winLossArray, 'L', true),
        weeksWon: allIndiciesOf(winLossArray, 'W', true),
        weeksTied: allIndiciesOf(winLossArray, 'T', true),
    }
}
const performScoreCalculations = ({ matchups, rosters, users }) => {
    const results = [];
    for (const rosterId in rosters) {
        const roster = rosters[rosterId];
        const record = roster.metadata.record;
        const winLossObj = createWinLossObj(record);
        const userId = roster.owner_id;
        //const { averagePFPerLoss, averagePFPerWin } = calculateAveragePFPerOutcome(winLossObj.weeksLost, winLossObj.weeksWon, matchups, rosterId);
        const scoresObject = createScoresObject(matchups, winLossObj, rosterId);

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

const createScoresObject = (matchups, winLossObj, rosterId) => {
    let scoreInWins = 0;
    let scoreInLosses = 0;
    let scoreInTies = 0;
    let totalScore = 0;

    for (const week in matchups) {
        matchups[week].forEach((m) => {
            const weekInt = Number.parseInt(week);
            if (m.roster_id != rosterId) { // Yes I am using fancy string coersion. I shouldn't, though.
                return
            }

            if (winLossObj.weeksWon.includes(weekInt)) {
                scoreInWins = scoreInWins + m.points;
            } else if (winLossObj.weeksLost.includes(weekInt)) {
                scoreInLosses = scoreInLosses + m.points;
            } else if (winLossObj.weeksTied.includes(weekInt)) {
                scoreInTies = scoreInTies + m.points;
            }
        })
    }
    const lossCount = winLossObj.weeksLost.length;
    const winCount = winLossObj.weeksWon.length;
    const tieCount = winLossObj.weeksTied.length;

    const PFPerResultCalculations = {
        totalScoreInWins: scoreInWins,
        averagePFPerWin: Number.parseFloat(scoreInWins / winCount),
        winCount: winCount,
        totalScoreInLosses: scoreInLosses,
        averagePFPerLoss: Number.parseFloat(scoreInLosses / lossCount),
        lossCount: lossCount,
        totalScoreInTies: scoreInTies ? scoreInTies : undefined,
        tieCount: scoreInTies ? tieCount : undefined,
        averagePFPerTie: scoreInTies ? Number.parseFloat(scoreInTies / tieCount) : undefined,
    }

    return PFPerResultCalculations;
}

const calculateAverageScore = ({ matchups }) => {
    for (const rosterId in rosters) {
        const roster = rosters[rosterId]
        // loop over matchup[week]

    }
}

const calculateStandardDeviation = (data) => {

}

module.exports = {
    performScoreCalculations
}

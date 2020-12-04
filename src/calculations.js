import { allIndiciesOf } from './dataUtils';
import { replaceUserIdWithTeamName } from './displayUtils';

const calculateAveragePFPerOutcome = ({ matchups, rosters, users }) => {
    const results = [];
    for (const rosterId in rosters) {
        const roster = rosters[rosterId];
        const record = roster.metadata.record;
        const weeksLost = allIndiciesOf(record.split(''), 'L', true);
        const weeksWon = allIndiciesOf(record.split(''), 'W', true);
        const reducer = (acc, week) => {
            let pointsScoredForThisRoster = null;
            matchups[week].forEach((m) => {
                if (m.roster_id == rosterId) {
                    pointsScoredForThisRoster = m.points;
                }
            })
            acc = acc + pointsScoredForThisRoster;
            return acc;
        };
        const totalScoredInLosses = weeksLost.reduce(reducer, 0)
        const totalScoredInWins = weeksWon.reduce(reducer, 0)

        const averagePFPerLoss = totalScoredInLosses / weeksLost.length;
        const averagePFPerWin = totalScoredInWins / weeksWon.length;
        const userId = roster.owner_id;
        results.push(
            {
                userId: userId,
                averagePFPerLoss: averagePFPerLoss,
                lossCount: weeksLost.length,
                averagePFPerWin: averagePFPerWin,
                winCount: weeksWon.length,
            }
        )
    }

    const prettifiedResults = replaceUserIdWithTeamName(results, users);
    return prettifiedResults;
};

const calculateAverageScrore = ({ matchups }) => {
    for (const rosterId in rosters) {
        const roster = rosters[rosterId]
        // loop over matchup[week]

    }
}

const calculateStandardDeviation = (data) => {

}

module.exports = {
    calculateAveragePFPerOutcome
}

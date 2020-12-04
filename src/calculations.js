const calculateAveragePFPerOutcome = ({ matchups, rosters, users }) => {
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

// TODO - Move this to a data massaging util file
/*
 * Needs an array of objects with a userId: userId field
 */
const replaceUserIdWithTeamName = (arr, users) => {
    return arr.map((a) => {
        const teamName = users[a.userId].metadata.team_name;
        const displayName = users[a.userId].display_name;
        const name = teamName ? teamName : displayName;
        delete a.userId;
        return {
            team: name,
            ...a,
            averagePFPerLoss: a.averagePFPerLoss.toFixed(2),
            averagePFPerWin: a.averagePFPerWin.toFixed(2),
        }
    })
};
module.exports = {
    calculateAveragePFPerOutcome
}

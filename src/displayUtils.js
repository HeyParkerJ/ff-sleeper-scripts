/*
 * Needs an array of objects with a userId: userId field
 */
export const replaceUserIdWithTeamName = (arr, users) => {
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

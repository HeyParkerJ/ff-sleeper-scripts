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
        }
    })
};

export const makeNumbersDisplayReady = (arr) => {
    return arr.map((a) => {
        for (const key in a) {
            const ak = a[key];
            if (a[key] !== undefined &&
                ak !== parseInt(ak) &&
                ak.toString().indexOf('.') !== -1) {
                a[key] = a[key].toFixed(2); // Is this mutation evil? Not sure...
            }
        }
        return a;
    })
}

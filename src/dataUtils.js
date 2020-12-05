export const allIndiciesOf = (array, element, increment) => {
    const indices = [];
    let idx = array.indexOf(element);
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

export const standardDeviation = (values) => {
    const avg = average(values);

    const squareDiffs = values.map((value) => {
        const diff = value - avg;
        const sqrDiff = diff * diff;
        return sqrDiff;
    });

    const avgSquareDiff = average(squareDiffs);

    const stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

export const average = (data) => {
    const sum = data.reduce((sum, value) => {
        return sum + value;
    }, 0);

    const avg = sum / data.length;
    return avg;
}

export const allIndiciesOf = (array, element, increment) => {
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

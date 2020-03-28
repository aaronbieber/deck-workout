export const cloneObject = (state) => {
    return JSON.parse(JSON.stringify(state));
}

export const pad = (n, z) => {
    var width = 2
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

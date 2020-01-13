export default {
    pointToLat (coordinates) {
        // eslint-disable-next-line no-console
        let a =  coordinates.substring(coordinates.indexOf("(")+1,coordinates.indexOf(")")).split(" ").map(Number);
        return ({lng: a[0], lat: a[1]})
    }
}

class SPARQLQueryDispatcher {
    constructor( endpoint ) {
        this.endpoint = endpoint;
    }

    query( sparqlQuery ) {
        const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
        const headers = { 'Accept': 'application/sparql-results+json' };

        return fetch( fullUrl, { headers } ).then( body => body.json() );
    }
}

const endpointUrl = 'https://query.wikidata.org/sparql';

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );

export default {
    searchAirport (country) {
        const searchAirport = `SELECT ?airport ?airportLabel ?place_served ?coor ?website ?image WHERE {
          ?airport wdt:P17 wd:`+ country +`;
            wdt:P31 wd:Q1248784;
            wdt:P931 ?place_served;
            wdt:P625 ?coor;
            wdt:P856 ?website;
            wdt:P18 ?image.
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],zh". }
        }`;
        return queryDispatcher.query( searchAirport )
    }
}

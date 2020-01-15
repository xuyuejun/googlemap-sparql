
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
    searchCountry (){
        const searchCountry = `SELECT ?country ?label WHERE {
            ?country wdt:P31 wd:Q6256.
            ?country rdfs:label ?label filter (lang(?label) = "zh").
        }`;

        return queryDispatcher.query( searchCountry )
    },
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
    },
    searchConnectsAirport () {
        const connectsAirport = `SELECT ?connectsairport ?connectsairportLabel ?place_served ?place_servedLabel ?coor ?image
            WHERE
            {
              VALUES ?airport { wd:Q17480 } # Antwerp international airport  wd:Q17480
              ?airport wdt:P81 ?connectsairport ;
                       wdt:P625 ?base_airport_coor .
              ?connectsairport wdt:P931 ?place_served ;
                               wdt:P625 ?coor ;
                               wdt:P18 ?image .
              SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
            }`;
        return queryDispatcher.query( connectsAirport )
    }
}

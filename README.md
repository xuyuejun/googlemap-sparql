# googlemap-sparql

[![](https://img.shields.io/travis/iview/iview.svg?style=flat-square)](https://travis-ci.org/iview/iview)

## About
googlemap-sparql is a front-end website airport map solution，It based on [Vue.js](https://github.com/vuejs/vue) and use [Wikidata Query Service](https://www.wikidata.org/)  

## Features
* Show airports in the selected country on the map
* Show selected Aircraft route
* Show airport details information

## Advanced Queries
### Search country
```
SELECT ?country ?label
WHERE
{
    ?country wdt:P31 wd:Q6256.
    ?country rdfs:label ?label filter (lang(?label) = "zh").
}
```

### Get all airport information in selected country
```
SELECT ?airport ?airportLabel ?place_served ?coor ?website ?image WHERE {
  ?airport wdt:P17 wd:Q17;
    wdt:P31 wd:Q1248784;
    wdt:P931 ?place_served;
    wdt:P625 ?coor;
    wdt:P856 ?website;
    wdt:P18 ?image.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
```
### Destinations from Antwerp International airport
```
SELECT DISTINCT ?countryLabel ?capitalLabel ?population ?capital_lon ?capital_lat ?mayorLabel ?birth_date ?age ?birth_place ?birth_placeLabel ?birth_place_lon ?birth_place_lat WHERE {
  ?country wdt:P17 wd:Q17;
    wdt:P36 ?capital.
  OPTIONAL { ?capital wdt:P1082 ?population. }
  ?capital (p:P625/psv:P625) ?capital_node.
  ?capital_node wikibase:geoLatitude ?capital_lat;
    wikibase:geoLongitude ?capital_lon.
  ?capital p:P6 ?statement.
  ?statement ps:P6 ?mayor.
  FILTER(NOT EXISTS { ?statement pq:P582 ?end_date. })
  ?mayor wdt:P569 ?birth_date.
  BIND((YEAR(NOW())) - (YEAR(?birth_date)) AS ?age)
  ?mayor wdt:P19 ?birth_place.
  ?birth_place wdt:P625 ?birth_place_coordinates;
    (p:P625/psv:P625) ?birth_place_node.
  ?birth_place_node wikibase:geoLatitude ?birth_place_lat;
    wikibase:geoLongitude ?birth_place_lon.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
```


## Project setup

### clone the project
```
git clone https://github.com/xuyuejun/googlemap-sparql.git
```

### Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```
### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

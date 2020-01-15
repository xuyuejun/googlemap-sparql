# googlemap-sparql

[![](https://img.shields.io/travis/iview/iview.svg?style=flat-square)](https://travis-ci.org/iview/iview)
[![vue](https://img.shields.io/badge/vue-2.6.10-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![element ui](https://img.shields.io/badge/element-2.13.0-brightgreen.svg?style=flat-square)](https://github.com/ElemeFE/element)


## About
googlemap-sparql is a front-end website airport map solution，It based on [Vue.js](https://github.com/vuejs/vue) and use [Wikidata Query Service](https://www.wikidata.org/)  

## Features
* Show airports in the selected country on the map
* Show selected Aircraft route
* Show airport details information

![image](https://github.com/xuyuejun/googlemap-sparql/blob/master/src/assets/screen.png?raw=true)

## Advanced Queries
### Search country
```
SELECT ?country ?label
WHERE
{
    ?country wdt:P31 wd:Q6256.
    ?country rdfs:label ?label filter (lang(?label) = "en").
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
SELECT ?connectsairport ?connectsairportLabel ?place_served ?place_servedLabel ?coor ?image
WHERE
{
  VALUES ?airport { wd:Q17480 } # Antwerp international airport  wd:Q17480
  ?airport wdt:P81 ?connectsairport ;
           wdt:P625 ?base_airport_coor .
  ?connectsairport wdt:P931 ?place_served ;
                   wdt:P625 ?coor ;
                   wdt:P18 ?image .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
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

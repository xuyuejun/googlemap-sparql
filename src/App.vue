<template>
    <div class="app">
        <md-toolbar class="md-title" md-elevation="1">
            <h3 class="md-title" style="flex: 1">Japan Airport Map</h3>
            <!--Change map type-->
            <md-button @click="debugMode()">Debugger</md-button>
            <md-menu md-size="medium" md-align-trigger>
                <md-button md-menu-trigger>MapType</md-button>
                <md-menu-content style="background-color: white">
                    <md-button md-menu-trigger @click="selectMapType('roadmap')">roadmap</md-button>
                    <md-button md-menu-trigger @click="selectMapType('satellite')">satellite</md-button>
                    <md-button md-menu-trigger @click="selectMapType('hybrid')">hybrid</md-button>
                    <md-button md-menu-trigger @click="selectMapType('terrain')">terrain</md-button>
                </md-menu-content>
            </md-menu>
            <!--Change Language-->
            <md-menu md-size="medium" md-align-trigger>
                <md-button md-menu-trigger>Language</md-button>
                <md-menu-content style="background-color: white">
                    <md-button md-menu-trigger @click="selectLanguage('English')">🇬🇧 English</md-button>
                    <md-button md-menu-trigger @click="selectLanguage('Japanese')">🇯🇵 Japanese</md-button>
                    <md-button md-menu-trigger @click="selectLanguage('Chinese')">🇨🇳 Chinese</md-button>
                </md-menu-content>
            </md-menu>
        </md-toolbar>
        <md-content class="body">
            <div style="width: 408px;overflow: auto" class="md-scrollbar md-theme-default">
                <div v-for="(marker,index) in markers" v-bind:key="index">
                    <md-list class="md-double-line">
                        <md-list-item>
                            <div class="md-list-item-text">
                                <span>{{ marker.label }}</span>
                                <span class="md-primary">{{ marker.address }}</span>
                            </div>

                            <md-button class="md-icon-button md-list-action" @click="link(marker.web)">
                                <md-icon class="md-primary">public</md-icon>
                            </md-button>
                        </md-list-item>
                        <md-divider></md-divider>
                    </md-list>
                </div>
            </div>
            <div class="demo">
                <google-map :map-type="mapType" :markers="markers"></google-map>
            </div>
        </md-content>
    </div>
</template>

<script>
    import GoogleMap from './components/GoogleMap.vue';
    import sparqlApi from './api/runsparql.js'

    export default {
        name: 'app',
        components: {
            GoogleMap
        },
        data() {
            return {
                mapType: 'roadmap',
                // markers: [{
                //     position: {lng: 120.4, lat: 30.2},
                //     label: 'ニセコヘリポート',
                //     address: '北海道虻田郡ニセコ町曽我870番',
                //     web: 'http://ja.dbpedia.org/resource/%E3%83%8B%E3%82%BB%E3%82%B3%E3%83%98%E3%83%AA%E3%83%9D%E3%83%BC%E3%83%88',
                //     show: false,
                // }],
                markers: []
            }
        },
        created() {
            this.initData()
        },
        methods: {
            selectMapType(type) {
                this.mapType = type
            },
            selectLanguage(type) {
                // eslint-disable-next-line no-console
                console.log(type)
            },
            link(url) {
                window.open(url, '_blank')
            },
            debugMode() {
                console.log("degbugMode")
            },
            sparql(endpoint, query) {
                let url = endpoint + '?query=' + encodeURIComponent(query);
                // eslint-disable-next-line no-console
                console.log(url)
                sparqlApi.runSparql(encodeURIComponent(query)).then(({ data }) => {
                    console.log(data.results.bindings)
                    data.results.bindings.forEach(item => {
                        this.markers.push({
                            label: item.label.value,
                            address: item.address.value,
                            web: item.s.value,
                            position: {
                                lng: Number(item.lng.value),
                                lat: Number(item.lat.value)
                            }
                        })
                    })
                })
            },
            initData() {
                let wikidataUrl = 'http://ja.dbpedia.org/sparql'

                let catQuery = `

                PREFIX dbpedia-ja: <http://ja.dbpedia.org/resource/>
                PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
                PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

                SELECT * WHERE {
                   ?s rdf:type dbpedia-owl:Airport ;
                      prop-ja:所在地 ?address .
                      OPTIONAL { ?s rdfs:label ?label . }
                      OPTIONAL {
                   ?s geo:long ?lng ;
                      geo:lat ?lat .
                      }
                      FILTER REGEX(?address, "^\\\\p{Han}{2,3}[都道府県]")
                } ORDER BY ?s
                    `
                this.sparql(wikidataUrl, catQuery)
            }
        }
    };
</script>

<style>
    .app {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
    }
    .body {
        display: flex;
        height: 100%;
        flex-direction: row;
        /*background-color: cadetblue;*/
    }
    .demo {
        width: 100%;
        height: 100%;
        /*background-color: antiquewhite;*/
    }
</style>

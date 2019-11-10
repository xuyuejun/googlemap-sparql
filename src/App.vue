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
                <div v-for="(position,index) in positions" v-bind:key="index">
                    <md-list class="md-double-line">
                        <md-list-item>
                            <div class="md-list-item-text">
                                <span>{{ position.label }}</span>
                                <span class="md-primary">{{ position.address }}</span>
                            </div>

                            <md-button class="md-icon-button md-list-action" @click="link(position.web)">
                                <md-icon class="md-primary">public</md-icon>
                            </md-button>
                        </md-list-item>
                        <md-divider></md-divider>
                    </md-list>
                </div>
            </div>
            <div class="demo">
                <google-map :map-type="mapType"></google-map>
            </div>
        </md-content>
    </div>
</template>

<script>
    import GoogleMap from './components/GoogleMap.vue';

    export default {
        name: 'app',
        components: {
            GoogleMap
        },
        data() {
            return {
                mapType: 'roadmap',
                // position: [{}]
                positions: [{
                    label: 'ニセコヘリポート',
                    address: '北海道虻田郡ニセコ町曽我870番',
                    web: 'http://ja.dbpedia.org/resource/%E3%83%8B%E3%82%BB%E3%82%B3%E3%83%98%E3%83%AA%E3%83%9D%E3%83%BC%E3%83%88'
                }, {
                    label: '下地島空港',
                    address: '沖縄県宮古島市伊良部',
                    web: 'http://ja.dbpedia.org/resource/%E4%B8%8B%E5%9C%B0%E5%B3%B6%E7%A9%BA%E6%B8%AF'
                }, {
                    label: '与那国空港',
                    address: '沖縄県八重山郡与那国町',
                    web: ''
                }]
            }
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
                console.log("Fuck You Four Letter Man!")
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

<template>
    <div class="app">
        <md-toolbar class="md-title" md-elevation="1">
            <h3 class="md-title" style="flex: 1">Japan Airport Map</h3>
            <!--Change map type-->
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
                <md-list class="md-double-line">
                    <md-list-item>
                        <div class="md-list-item-text">
                            <span>名古屋飛行場</span>
                            <span class="md-primary">愛知県豊山町、小牧市、春日井市、名古屋市</span>
                        </div>

                        <md-button class="md-icon-button md-list-action">
                            <md-icon class="md-primary">public</md-icon>
                        </md-button>
                    </md-list-item>
                    <md-divider></md-divider>
                </md-list>
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
            }
        },
        methods: {
            selectMapType(type) {
                this.mapType = type
            },
            selectLanguage(type) {
                // eslint-disable-next-line no-console
                console.log(type)
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

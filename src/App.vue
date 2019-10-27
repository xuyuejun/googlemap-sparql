<template>
    <div class="app">
        <md-toolbar class="md-accent" md-elevation="1">
            <h3 class="md-title" style="flex: 1">Japan Airport Map</h3>
            <md-tabs>
                <md-tab id="tab-home" md-label="Home"></md-tab>
                <md-tab id="tab-pages" md-label="Pages"></md-tab>
                <md-tab id="tab-posts" md-label="Posts"></md-tab>
                <md-tab id="tab-favorites" md-label="Favorites"></md-tab>
            </md-tabs>
            <!--<md-button>Refresh</md-button>-->
        </md-toolbar>
        <div class="body">
            <md-card>
                <md-table style="width: 408px">
                    <md-table-row>
                        <md-table-head md-numeric>ID</md-table-head>
                        <md-table-head>Name</md-table-head>
                        <md-table-head>Email</md-table-head>
                    </md-table-row>

                    <md-table-row>
                        <md-table-cell md-numeric>1</md-table-cell>
                        <md-table-cell>Shawna Dubbin</md-table-cell>
                        <md-table-cell>sdubbin0@geocities.com</md-table-cell>
                    </md-table-row>

                    <md-table-row>
                        <md-table-cell md-numeric>2</md-table-cell>
                        <md-table-cell>Odette Demageard</md-table-cell>
                        <md-table-cell>odemageard1@spotify.com</md-table-cell>
                    </md-table-row>

                    <md-table-row>
                        <md-table-cell md-numeric>3</md-table-cell>
                        <md-table-cell>Vera Taleworth</md-table-cell>
                        <md-table-cell>vtaleworth2@google.ca</md-table-cell>
                    </md-table-row>
                </md-table>
            </md-card>
            <div class="demo">

            </div>
        </div>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue';

    export default {
        name: 'app',
        components: {
            // HelloWorld
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
        background-color: antiquewhite;
    }
</style>

<template>
    <div class="container">
        <!--{{ zoom }}-->
        <!--<button @click="testButton">Test Button</button>-->
        <GmapMap
            :center="center"
            :zoom="zoom"
            :map-type-id="mapType"
            :options="{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true,
                disableDefaultUi: false
            }"
            class="map"
        >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
            />
        </GmapMap>
    </div>
</template>

<script>
    export default {
        name: 'GoogleMap',
        props: [
            "mapType",
            "markers"
        ],
        data() {
            return {
                center: {
                    lat: 35.41,
                    lng: 139.41
                },
                zoom: 5,
                // markers: [{
                //     position: {lng: 120.4, lat: 30.2},
                //     label: 'ニセコヘリポート',
                //     address: '北海道虻田郡ニセコ町曽我870番',
                //     web: 'http://ja.dbpedia.org/resource/%E3%83%8B%E3%82%BB%E3%82%B3%E3%83%98%E3%83%AA%E3%83%9D%E3%83%BC%E3%83%88',
                //     show: false
                // }]
            }
        },
        mounted() {

        },
        methods: {
            testButton() {
                this.zoom = this.zoom + 1
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container {
        background-color: cornflowerblue;
        height: 100%;
        width: 100%;
    }
    .map {
        width: 100%;
        height: 100%;
    }
</style>
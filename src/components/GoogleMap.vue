<template>
    <div class="container">
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
                :icon="image"
                @click="test(m)"
            />
            <GmapPolyline
                :key="index"
                v-for="(p, index) in paths"
                :path="p.paths"
            />
        </GmapMap>
    </div>
</template>

<script>
    export default {
        name: 'GoogleMap',
        props: [
            "mapType",
            "markers",
            "paths"
        ],
        data() {
            return {
                center: {
                    lat: 35.41,
                    lng: 139.41
                },
                zoom: 5,
                // paths: [
                //     {lat: 37.772, lng: -122.214},
                //     {lat: 21.291, lng: -157.821},
                //     {lat: -18.142, lng: 178.431},
                //     {lat: -27.467, lng: 153.027}
                // ],
                image: 'https://www.google.co.jp/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/airport_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff?scale=1',
                // image: 'https://www.google.es/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-1-small.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/airport_pinlet-2-medium.png&highlight=ff000000,ffffff,10bdff,ffffff&color=ff000000?scale=1'
            }
        },
        mounted() {

        },
        methods: {
            test(m) {
                this.center = m.position
                this.$emit('click-point',m)
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
<template>
    <div class="container">
        <GmapMap
            :center="{lat:10, lng:10}"
            :zoom="7"
            map-type-id="terrain"
            style="width: 100%; height: 100%"
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
        mounted() {
        },
        methods: {
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
</style>
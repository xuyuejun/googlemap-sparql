<template>
    <div>
        <el-container style="height: 100vh; border: 1px solid #eee">
            <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpenMenu" @close="handleCloseMenu" :collapse="isCollapse" style="height: 100%">
                    <el-menu-item index="1" v-model="isCollapse" @click="isCollapse = !isCollapse">
                        <i class="el-icon-s-unfold" v-if="isCollapse === true"></i>
                        <i class="el-icon-s-fold" v-else></i>
                        <span slot="title">Menu</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="drawer = true">
                        <i class="el-icon-search"></i>
                        <span slot="title">Search</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-position" @click="searchConnectsAirport"></i>
                        <span slot="title">AirLine</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="isShowDetail = !isShowDetail">
                        <i class="el-icon-location-outline"></i>
                        <span slot="title">Details</span>
                    </el-menu-item>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-map-location"></i>
                            <span>Map style</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">Map style</template>
                            <el-menu-item index="1-1" @click="selectMapType('roadmap')">roadmap</el-menu-item>
                            <el-menu-item index="1-2" @click="selectMapType('satellite')">satellite</el-menu-item>
                            <el-menu-item index="1-3" @click="selectMapType('hybrid')">hybrid</el-menu-item>
                            <el-menu-item index="1-4" @click="selectMapType('terrain')">terrain</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>Language settings</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">Language settings</template>
                            <el-menu-item index="1-1">English</el-menu-item>
                            <el-menu-item index="1-2">Chinese</el-menu-item>
                            <el-menu-item index="1-3">Japanese</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-aside width="200px" v-if="isShowDetail">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                    </div>
                </el-card>
            </el-aside>
            <el-container>
                <!--<el-header>-->
                <!--<el-button @click="test" type="primary" style="margin-left: 16px;">-->
                <!--点我-->
                <!--</el-button>-->
                <!--</el-header>-->
                <el-main style="padding: 0px">
                    <google-map
                        :map-type="mapType"
                        :markers="markers"
                        :paths="AirLineInfo"
                        @click-point="clickPoint"
                    >
                    </google-map>
                </el-main>
            </el-container>
            <!--搜索机场-->
            <el-drawer
                title="搜索机场"
                :visible.sync="drawer"
                :direction="direction"
                :with-header="false"
            >
                <div class="drawer-title">Search airports by country!</div>
                <div class="drawer-content">
                    <el-form :model="form">
                        <el-form-item label="Select country" :label-width="formLabelWidth">
                            <el-select v-model="selectedCountry" filterable placeholder="Please select a country">
                                <el-option
                                    v-for="item in countryList"
                                    :key="item.country"
                                    :label="item.label"
                                    :value="item.country"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="drawer-footer">
                        <el-button @click="drawer = false">Cancel</el-button>
                        <el-button type="primary" @click="searchButton">{{ 'Confirm' }}</el-button>
                    </div>
                </div>
            </el-drawer>
            <!--显示机场详细信息-->
            <el-drawer
                title="搜索机场"
                :visible.sync="drawerAirportInfo"
                :direction="direction"
                :modal="false"
                :with-header="false"
                class="drawer-airport-Info"
            >
                <el-image :src="AirportInfo.image" >123</el-image>
                <div style="font-size: 20px">{{ this.AirportInfo.address }}</div>
            </el-drawer>

        </el-container>
    </div>
</template>

<script>
    import GoogleMap from './components/GoogleMap.vue';
    import sparqlApi from './api/runsparql.js'
    import pointToLatLng from "./assets/pointToLatLng";

    export default {
        name: 'app',
        components: {
            GoogleMap
        },
        data() {
            return {
                mapType: 'roadmap',
                markers: [],
                isCollapse: true,
                isShowDetail: false,
                drawer: false,
                drawerAirportInfo: false,
                direction: 'ltr',

                AirportInfo: [],
                connectsAirportInfo: [],
                AirLineInfo: [],
                testImg: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                timer: null,
                selectedCountry: 'Q17',
                countryList: []
            }
        },
        created() {
            this.searchCountry()
            this.searchAirLine()

        },
        methods: {
            handleOpenMenu(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCloseMenu(key, keyPath) {
                console.log(key, keyPath);
            },
            selectMapType(type) {
                this.mapType = type
            },
            searchButton() {
                this.drawer = false
                this.searchAirLine()
            },
            searchCountry() {
                sparqlApi.searchCountry().then((data) => {
                    data.results.bindings.forEach(item => {
                        this.countryList.push({
                            country: item.country.value.substring(31),
                            label: item.label.value
                        })
                    })
                })
            },
            searchAirLine() {
                sparqlApi.searchAirport(this.selectedCountry).then((data) => {
                    this.markers = []
                    data.results.bindings.forEach(item => {
                        this.markers.push({
                            label: item.airport.value,
                            address: item.airportLabel.value,
                            web: item.website.value,
                            position: pointToLatLng.pointToLat(item.coor.value),
                            image: item.image.value
                        })
                    })
                })
            },
            searchConnectsAirport() {
                sparqlApi.searchConnectsAirport().then((data) => {
                    this.connectsAirportInfo = []
                    data.results.bindings.forEach(item => {
                        this.connectsAirportInfo.push({
                            label: item.connectsairportLabel.value,
                            position: pointToLatLng.pointToLat(item.coor.value),
                            image: item.image.value
                        })
                    })
                    this.createAirLine()
                    this.markers = this.connectsAirportInfo

                })
            },
            createAirLine() {
                this.connectsAirportInfo.forEach(item => {
                    console.log(item)
                    this.AirLineInfo.push({
                        paths: [
                            {lat: 51.189444444, lng: 4.460277777},
                            item.position
                        ],
                    })
                })
            },
            test() {
                // this.drawerAirportInfo = true
                console.log(this.AirLineInfo)
            },
            clickPoint(m) {
                console.log("On click point")
                this.drawerAirportInfo = true
                console.log(m)
                this.AirportInfo = m
            },
            test2() {
                console.log(pointToLatLng.pointToLat("Point(-15.749 28.536)"))

            }
        }
    };
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
    .drawer-title {
        align-items: center;
        color: #72767b;
        font-size: 16px;
        display: flex;
        margin-bottom: 32px;
        padding: 20px 20px 0;
    }
    .drawer-content {
        padding: 20px;
    }
    .drawer-footer {
        display: flex;
    }
    .drawer-airport-Info {
        width: 1200px;
    }
</style>

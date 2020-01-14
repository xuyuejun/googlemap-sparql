<template>
    <div>
        <el-container style="height: 100vh; border: 1px solid #eee">
            <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpenMenu" @close="handleCloseMenu" :collapse="isCollapse" style="height: 100%">
                    <el-menu-item index="1" v-model="isCollapse" @click="isCollapse = !isCollapse">
                        <i class="el-icon-s-unfold" v-if="isCollapse === true"></i>
                        <i class="el-icon-s-fold" v-else></i>
                        <span slot="title">菜单</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="drawer = true">
                        <i class="el-icon-search"></i>
                        <span slot="title">搜索</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-position" @click="searchAirLine"></i>
                        <span slot="title">航线</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="isShowDetail = !isShowDetail">
                        <i class="el-icon-location-outline"></i>
                        <span slot="title">详细信息</span>
                    </el-menu-item>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-map-location"></i>
                            <span>地图样式</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">地图样式</template>
                            <el-menu-item index="1-1" @click="selectMapType('roadmap')">roadmap</el-menu-item>
                            <el-menu-item index="1-2" @click="selectMapType('satellite')">satellite</el-menu-item>
                            <el-menu-item index="1-3" @click="selectMapType('hybrid')">hybrid</el-menu-item>
                            <el-menu-item index="1-4" @click="selectMapType('terrain')">terrain</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>语言设置</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">语言设置</template>
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
                <el-header>
                    <el-button @click="test" type="primary" style="margin-left: 16px;">
                        点我
                    </el-button>
                </el-header>
                <el-main style="padding: 0px">
                    <google-map :map-type="mapType" :markers="markers"></google-map>
                </el-main>
            </el-container>

            <el-drawer
                title="搜索机场"
                :visible.sync="drawer"
                :direction="direction"
                :with-header="false"
            >
                <div class="drawer-title">我嵌套了搜索程序!</div>
                <div class="drawer-content">
                    <el-form :model="form">
                        <el-form-item label="选择国家" :label-width="formLabelWidth">
                            <el-select v-model="selectedCountry" filterable placeholder="请选择国家">
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
                        <el-button @click="drawer = false">取 消</el-button>
                        <el-button type="primary" @click="searchButton">{{ '确 定' }}</el-button>
                    </div>
                </div>
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
                direction: 'ltr',

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
                formLabelWidth: '80px',
                timer: null,
                selectedCountry: '',
                countryList: []
            }
        },
        created() {
            this.searchCountry()
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
                    console.log("显示data")
                    console.log(data)
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
                        // eslint-disable-next-line no-console
                        console.log(item)
                        this.markers.push({
                            label: item.airport.value,
                            address: item.airportLabel.value,
                            web: item.website.value,
                            position: pointToLatLng.pointToLat(item.coor.value)
                        })
                    })
                })
            },
            test() {
                console.log(this.countryList)
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
</style>

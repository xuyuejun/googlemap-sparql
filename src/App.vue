<template>
    <!--
    <div class="app">
        <md-toolbar class="md-title" md-elevation="1">
            <h3 class="md-title" style="flex: 1">Japan Airport Map</h3>
            Change map type
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
            Change Language
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
    -->
    <div>
        <el-container style="height: 100vh; border: 1px solid #eee">
            <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" style="height: 100%">
                    <el-menu-item index="1" v-model="isCollapse" @click="isCollapse = !isCollapse">
                        <i class="el-icon-s-unfold" v-if="isCollapse === true"></i>
                        <i class="el-icon-s-fold" v-else></i>
                        <span slot="title">菜单</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-search"></i>
                        <span slot="title">搜索</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-position"></i>
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
            </el-aside>

            <el-container>
                <el-header>
                    <el-drawer
                        title="我是标题"
                        :visible.sync="drawer"
                        :direction="direction"
                        :modal="false"
                        :before-close="handleCloseDrawer">
                        <span>我来啦!</span>
                    </el-drawer>
                </el-header>
                <el-main style="padding: 0px">
                    <google-map :map-type="mapType" :markers="markers"></google-map>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import GoogleMap from './components/GoogleMap.vue';
    // import sparqlApi from './api/runsparql.js'

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
                direction: 'rtl'
            }
        },
        created() {

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            selectMapType(type) {
                this.mapType = type
            },
            handleCloseDrawer(done) {
                this.$confirm('确认关闭？')
                    // eslint-disable-next-line no-unused-vars
                    .then(_ => {
                        done();
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch(_ => {});
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
</style>

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Formatter from './formatter'

Vue.use(VueI18n);

const locale = 'en';  // default locale
const formatter = new Formatter({ locale });

export default new VueI18n({
  locale,
  formatter,
  messages: {
    'en': {
      menu: 'Menu',
      search: 'Search',
      airline: 'Airline',
      mapStyle: 'Map Style',
      languageSetting: 'Language Setting',
      searchAirportByCountry: 'Search airports by country!',
      selectCountry: 'Select Country',
      cancel: 'Cancel',
      confirm: 'Confirm',
      roadMap: 'RoadMap',
      satellite: 'Satellite',
      hybrid: 'Hybrid',
      terrain: 'Terrain'
    },
    'zh': {
      menu: '菜单',
      search: '查找',
      airline: '航线 ',
      mapStyle: '地图样式',
      languageSetting: '语言设置',
      searchAirportByCountry: '按国家搜索机场!',
      selectCountry: '选择国家',
      cancel: '取消',
      confirm: '确认',
      roadMap: '道路地图',
      satellite: '卫星地图',
      hybrid: '混合',
      terrain: '地形图'
    },
    'ja': {
      menu: 'メニュー',
      search: '検索',
      airline: '航路',
      mapStyle: '地図スタイル',
      languageSetting: '言語設定',
      searchAirportByCountry: '空港国別検索',
      selectCountry: '国を選ぶ',
      cancel: 'キャンセル',
      confirm: '確定',
      roadMap: 'ロードマップ',
      satellite: '衛星',
      hybrid: 'ハイブリッド',
      terrain: '地形'
    }
  }
})

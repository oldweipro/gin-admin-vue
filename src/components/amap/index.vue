<template>
  <div id="container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import { shallowRef } from '@vue/reactivity'
export default {
  name: 'MapContainer',
  setup() {
    const map = shallowRef(null)
    return {
      map,
    }
  },
  methods: {
    initMap() {
      AMapLoader.load({
        // 申请好的Web端开发者Key，首次调用 load 时必填
        key: 'eaae26552d1ff95b72c731c49ea25113',
        // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        version: '2.0',
        // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        plugins: [''],
      }).then((AMap) => {
        // 设置地图容器id
        this.map = new AMap.Map('container', {
          // 是否为3D地图模式
          viewMode: '2D',
          // 初始化地图级别
          zoom: 18,
          // 初始化地图中心点位置
          center: [108.936657, 34.296013],
        })
      }).catch(e => {
        console.log(e)
      })
    },
  },
  mounted() {
    // DOM初始化完成进行地图初始化
    this.initMap()
  }
}
</script>

<style scoped>
  #container{
    padding:0px;
    margin: 0px;
    width: 100%;
    height: 800px;
  }
</style>

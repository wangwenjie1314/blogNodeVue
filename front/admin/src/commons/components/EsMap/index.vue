<template>
  <div id="map" style="height: 600px;width: 100%;overflow:hidden"></div>
</template>
<script>
export default {
  name: "EsMap",
  props: {
    pageType: {
      type: String,
      default: "preview"
    }, //preview预览、addMark可操作打点、drawCircle高级画圆形
    mapCenters: {
      type: Array,
      default: function() {
        return [39.91, 116.43];
      }
    },
    mapMarks: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      mapInstance: null,
      mapMarkHash: {},
      mapGroups: null, //地图打点
      circleRadius: 0, // 圆半径
      circleHeart: null, // 圆心
      circleInstance: null // 圆形实例
    };
  },
  watch: {
    mapMarks(newVal, oldVal) {
      if (newVal != oldVal && this.mapInstance) {
        console.log(newVal);
        this.initMarks();
      }
    }
  },
  mounted() {
    let vm = this;
    vm.initMap();
  },
  methods: {
    initMap() {
      let vm = this;
      vm.mapInstance = new L.map("map", {
        CRS: "Simple", //离线地图加载规则
        center: new L.latLng(vm.mapCenters[0], vm.mapCenters[1]), //地图中心点
        zoom: 13,
        zoomInTitle: "放大",
        zoomOutTitle: "缩小", //默认展示的缩放级别
        layers: [new L.TileLayer(window.blogConfig.map + "{z}/{x}/{y}.png")], //插入的地图的图层 //https://{s}.tile.openstreetvm.mapInstance.org/{z}/{x}/{y}.png
        minZoom: 0, //最小缩放级别
        maxZoom: 13, //最大缩放级别
        opacity: 0.1, //图层的不透明度
        maxBounds: [
          //地图的东西南北最大边界 //在缩放级别和是的情况下，地图只会展示在当前的区域内
          [40.53, 117.5], //south west
          [39.24, 115.51] //north east
        ]
      });
      //注入事件
      vm.initEvent();
      vm.initMarks();
      vm.initDrawCircle();
    },
    initEvent() {
      let vm = this;
      if (vm.pageType === "addMark") {
        //点击地图 监听单击新增打点
        vm.mapInstance.on("click", function(e) {
          let { lat, lng } = e.latlng;
          if (!vm.mapMarkHash[lat.toFixed(5) + "_" + lng.toFixed(5)]) {
            vm.$emit("click", e.latlng);
          }
        });
      } else if (vm.pageType === "drawCircle") {
        //双击再次激活画圈
        vm.mapInstance.on("dblclick", function(e) {
          vm.initDrawCircle();
        });
      }
    },
    initMarks() {
      let vm = this;
      // 清除之前打点
      vm.mapGroups && vm.mapGroups.clearLayers();
      // 重新打点
      let mapMarkHash = {};
      let mapLayers = [];
      vm.mapMarks.map(v => {
        if (v && v.c_isdel === "0") {
          mapMarkHash[v.c_lat + "_" + v.c_lng] = v;
          let mapLayer = L.marker([v.c_lat, v.c_lng]).addTo(vm.mapInstance);
          mapLayer.off("click").on("click", function(e) {
            let { lat, lng } = e.latlng;
            vm.$emit(
              "markclick",
              vm.mapMarkHash[lat.toFixed(5) + "_" + lng.toFixed(5)]
            );
          });
          mapLayers.push(mapLayer);
        }
      });
      vm.mapMarkHash = mapMarkHash;
      vm.mapGroups = L.layerGroup(mapLayers);
      vm.mapInstance.addLayer(vm.mapGroups);
    },
    addLayer() {
      let vm = this;
      // 第三方地图
      let layers = {};
      layers["地图"] = L.layerGroup([
        L.tileLayer.chinaProvider("GaoDe.Normal.Map", {
          maxZoom: 18,
          minZoom: 5
        })
      ]);
      layers["影像"] = L.layerGroup([
        L.tileLayer.chinaProvider("GaoDe.Satellite.Map", {
          maxZoom: 18,
          minZoom: 5
        }),
        L.tileLayer.chinaProvider("GaoDe.Satellite.Annotion", {
          maxZoom: 18,
          minZoom: 5
        })
      ]);
      L.control.layers(layers).addTo(vm.mapInstance);
    },
    initDrawCircle() {
      const vm = this;
      // 非画圈不执行
      if (vm.pageType !== "drawCircle") {
        return;
      }
      // 清除之前
      if (vm.circleInstance) {
        vm.mapInstance.removeLayer(vm.circleInstance);
        vm.circleInstance = null;
        vm.circleHeart = null;
        vm.circleRadius = 0;
      }
      vm.circleInstance = new L.circle();
      //将mousemove事件移动地图禁用
      vm.mapInstance.dragging.disable();
      vm.mapInstance.on("mousedown", e => {
        vm.circleHeart = e.latlng; //确定圆心
      });
      vm.mapInstance.on("mouseup", e => {
        vm.mapInstance.off("mousedown");
        vm.mapInstance.off("mousemove");
        vm.mapInstance.off("mouseup");
        vm.mapInstance.dragging.enable();
        // 触发画圈事件
        let { lat, lng } = vm.circleHeart;
        vm.$emit("drawcircle", {
          lat: lat.toFixed(5),
          lng: lng.toFixed(5),
          raduis: vm.circleRadius.toFixed(5)
        });
      });
      vm.mapInstance.on("mousemove", e => {
        if (vm.circleHeart) {
          vm.circleRadius = L.latLng(e.latlng).distanceTo(vm.circleHeart);
          vm.circleInstance.setLatLng(vm.circleHeart);
          vm.circleInstance.setRadius(vm.circleRadius);
          vm.circleInstance.setStyle({
            color: "#f00",
            fillColor: "#f00",
            fillOpacity: 0.3
          });
          vm.mapInstance.addLayer(vm.circleInstance);
        }
      });
    }
  },
  destroyed() {
    let vm = this;
    // 操作类型
    if (vm.mapInstance) {
      // vm.mapInstance.off("click");
      // vm.mapInstance.off("dblclick");
      vm.mapInstance.off();
      vm.mapInstance.remove(); //remove() Destroys the map and clears all related event listeners.
      vm.mapInstance = null;
    }
  }
};
</script>

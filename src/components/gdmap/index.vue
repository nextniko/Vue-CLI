<template>
    <div class="GDmap">
        <!-- <div class="search-box">
            <input
                v-model="searchKey"
                type="search"
                id="search"
            >
            <button @click="searchByHand">搜索</button>
            <div class="tip-box" id="searchTip"></div>
        </div> -->
        <ul>
            <li 
                v-for="(text,index) in nearbyBusinesses" 
                :key="index+2"
                @click="choiceAddress(text.text,text.phone,text.addressname,text.agentId)"
            >
                {{text.text}}
                <p>
                    {{text.distance!=='NaN'?text.distance+"公里":"无距离展示"}} 
                </p>
                <p>
                    {{text.addressname===''?'此商家无地址':text.addressname}}
                </p>
            </li>
        </ul>
        <!--
          amap-manager： 地图管理对象
          vid：地图容器节点的ID
          zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
          center： 地图中心点坐标值
          plugin：地图使用的插件
          events： 事件
        -->
        <el-amap class="amap-box"
            :amap-manager="amapManager"
            :vid="'amap-vue'"
            :zoom="zoom"
            :plugin="plugin"
            :center="center"
            :events="events"
        >
            <el-amap-text 

                class="text-class"
                v-for="(text,index) in nearbyBusinesses" 
                :key="index+1" 
                :text="text.text"
                :offset="text.offset"
                :position="text.position"
                :events="text.events"
            >
            </el-amap-text>
            <!-- 标记 -->
            <el-amap-marker 
                v-for="(marker, index) in markers" 
                :key="index"
                :position="marker"
            >
            </el-amap-marker>
        </el-amap>
    </div>
</template>

<script>
import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
let amapManager = new AMapManager()
export default {
    data() {
        let self = this
        return{
            address: [

            ],
            searchKey: '',
            amapManager,
            markers: [[0,0]],
            searchOption: {
                city: '全国',
                citylimit: true
            },
            center: [0,0],
            nearbyBusinesses:[
                
            ],
            zoom: 17,
            lng: 30.612415,
            lat: 104.0951,
            loaded: true,
            events: {
                init(o) {
                    lazyAMapApiLoaderInstance.load().then(() => {
                        // self.initSearch()
                    })
                },
                // 点击获取地址的数据
                click(e) {
                    // self.markers = []
                    // let {lng, lat} = e.lnglat
                    // self.lng = lng
                    // self.lat = lat
                    // self.center = [lng, lat]
                    // self.markers.push([lng, lat])
                    // // 这里通过高德 SDK 完成。
                    // let geocoder = new AMap.Geocoder({
                    //     radius: 1000,
                    //     extensions: 'all'
                    // })
                    // geocoder.getAddress([lng, lat], function (status, result) {
                    //     if (status === 'complete' && result.info === 'OK') {
                    //         if (result && result.regeocode) {
                    //             self.address = result.regeocode.formattedAddress
                    //             self.searchKey = result.regeocode.formattedAddress
                    //             self.$nextTick()
                    //         }
                    //     }
                    // })
                },
            },
            // 一些工具插件
            plugin: [
                // {
                //   pName: 'PlaceSearch',
                //   events: {
                //     init (o) {
                //       console.log(o)
                //     }
                //   }
                // },
                // {
                //   pName: 'Geocoder',
                //   events: {
                //     init (o) {
                //       console.log(o.getAddress())
                //       console.log(o)
                //     }
                //   }
                // },
                // {
                //     // 定位
                //     pName: 'Geolocation',
                //     events: {
                //         init(o) {
                //             // o是高德地图定位插件实例
                //             o.getCurrentPosition((status, result) => {
                //                 if (result && result.position) {
                //                     // 设置经度
                //                     self.lng = result.position.lng
                //                     // 设置维度
                //                     self.lat = result.position.lat
                //                     // 设置坐标
                //                     self.center = [self.lng, self.lat]
                //                     self.markers.push([self.lng, self.lat])
                //                     // load
                //                     self.loaded = true
                //                     // 页面渲染好后
                //                     self.$nextTick()
                //                 }
                //             })
                //         }
                //     }
                // },
                // {
                //     // 工具栏
                //     pName: 'ToolBar',
                //     events: {
                //         init(instance) {
                //             console.log(instance);
                //         }
                //     }
                // },
                // {
                //     // 鹰眼
                //     pName: 'OverView',
                //     events: {
                //         init(instance) {
                //             console.log(instance);
                //         }
                //     }
                // },
                // {
                //     // 地图类型
                //     pName: 'MapType',
                //     defaultType: 0,
                //     events: {
                //         init(instance) {
                //             console.log(instance);
                //         }
                //     }
                // },
                // {
                //     // 搜索
                //     pName: 'PlaceSearch',
                //     events: {
                //         init(instance) {
                //             console.log(instance)
                //         }
                //     }
                // }
            ]
        }  
    },
    methods:{
        // 头部搜索
        // initSearch() {
        //     let vm = this
        //     let map = this.amapManager.getMap()
        //     AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
        //         var poiPicker = new PoiPicker({
        //             input: 'search',
        //             placeSearchOptions: {
        //                 map: map,
        //                 pageSize: 10
        //             },
        //             suggestContainer: 'searchTip',
        //             searchResultsContainer: 'searchTip'
        //         })
        //         vm.poiPicker = poiPicker
        //         // 监听poi选中信息
        //         poiPicker.on('poiPicked', function (poiResult) {
        //             // console.log(poiResult)
        //             let source = poiResult.source
        //             let poi = poiResult.item
        //             if (source !== 'search') {
        //                 poiPicker.searchByKeyword(poi.name)
        //             } else {
        //                 poiPicker.clearSearchResults()
        //                 vm.markers = []
        //                 let lng = poi.location.lng
        //                 let lat = poi.location.lat
        //                 let address = poi.cityname + poi.adname + poi.name
        //                 vm.center = [lng, lat]
        //                 vm.markers.push([lng, lat])
        //                 vm.lng = lng
        //                 vm.lat = lat
        //                 vm.address = address
        //                 vm.searchKey = address
        //             }
        //         })
        //     })
        // },
        searchByHand() {
            if (this.searchKey !== '') {
                this.poiPicker.searchByKeyword(this.searchKey)
            }
        },
        // 选择城市
        choiceAddress(name,phone,address,id){
            this.$confirm(`确定指派商家给${address}吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '我再想想',
                type: 'warning',
            })
            .then(()=>{
                this.$message({
                    type: 'success',
                    message: `已指派给${name}`
                })
                this.$emit("addressinfo",name,phone,address,id)
                
            })
            .catch(()=>{
                this.$message({
                    type: 'info',
                    message: '取消指派'
                })
            })
        },
        // 经纬度距离
        distanceByLnglat(lng1, lat1, lng2, lat2) {
			var radLat1 = this.Rad(lat1);
			var radLat2 = this.Rad(lat2);
			var a = radLat1 - radLat2;
			var b = this.Rad(lng1) - this.Rad(lng2);
			var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
			s = s * 6378137.0; // 取WGS84标准参考椭球中的地球长半径(单位:m)
            s = Math.round(s * 10000) / 10000;
			// //下面为两点间空间距离（非球面体）
			var value= Math.pow(Math.pow(lng1-lng2,2)+Math.pow(lat1-lat2,2),1/2);
            return value.toFixed(2)
        },
        // 经纬度转换
        Rad(d) {
			return d * Math.PI / 180.0;
        },
        // 获取经纬度地址
        getnearbyBusinesses(lat,lng){
            let that = this
            let address 
            let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: 'all'
            })
            return new Promise((resolve,reject)=>{
                geocoder.getAddress([lat, lng], function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.regeocode) {
                            address = result.regeocode.formattedAddress
                            resolve(address)
                        }
                    }else{
                        resolve("此商户无地址")
                    }
                })
            })
            
        }
    },
    props:{
        MapData:{
            type:Array,
        }
    },
    mounted:function(){
        this.markers = [[104.0951,30.612415]]
        this.center = [104.0951,30.612415] 
        this.lng = 30.612415
        this.lat = 104.0951
        this.MapData.map((item,i)=>{
            this.getnearbyBusinesses(item.longitude,item.latitude).then(res=>{
                let mapPosition = {
                    position: [104.0951, 30.612415],
                    text: item.merchantName,
                    phone:item.phone,
                    agentId:item.agentId,
                    addressname:res,
                    distance:this.distanceByLnglat(104.0951,30.612415,item.longitude,item.latitude),
                    offset: [0, 0],
                    events: {
                        click: (info) => {
                            this.choiceAddress(info.target.Cv.innerText,item.phone,res,item.agentId)
                            
                        }
                    },
                }
                this.nearbyBusinesses.push(mapPosition)
            })
        })
    }
}
</script>

<style lang="scss" scoped>
    @import './css/index.scss';
</style>
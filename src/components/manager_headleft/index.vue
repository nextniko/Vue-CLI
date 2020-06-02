<template>
    <div class="manager_common">
        <div class="headerall displayflex boxsizing">
			<img src="./img/business_manager.png" alt="">
			<div class="displayflex">
				<div class="headleft">
					<span>后台管理系统</span>
				</div>
				<div class="headright">
					<div class="btn-fullscreen" @click="handleFullScreen">
						<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
							<i class="el-icon-rank"></i>
						</el-tooltip>
					</div>
					<div>
						<img src="./img/business_manager.png" alt="">
						<span>admin</span>
						<ul>
							<li>
								<img src="./img/business_manager.png" alt="">
								<span>退出登录</span>
							</li>
						</ul>
						<img src="./img/business_manager.png" alt="">
					</div>
				</div>
			</div>
		</div>
        <div class="body_all">
            <ul class="leftall" :style="width">
                <li class='left_header'>
                    <p>
                        <img src="./img/header_click.png" alt="" 
                            @click="telesCoping"
                            @mouseover="alertlitte"
                        >
                    </p>
                </li>
                <li v-for="(items,indexs) in Administration" :key="indexs">
                    <div class="displayflex" @click="clickdown(indexs)" >
                        <p>
                            <img :src="items.img" alt="">
                            <span>{{items.name}}</span>
                            <img class="pullImg" src="./img/pull.png" alt="" v-if="!items.route">
                        </p>
                    </div>
                    <transition name="fade">
                        <ul v-if="items.status" class="click_pull_down">
                            <li v-for="(item,index) in items.children" :key="index" @click="routergo(item.route,indexs,index)" :class="item.active?'activecss':''">
                                <router-link :to="{path:item.route}">{{item.name}}</router-link>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
            <!-- 小悬浮框 -->
            <ul 
                class="leftalert" 
                :style="leftalert.screenWidth"
                @mouseover="alertlitte"
                @mouseout="closealert"
            >
                <li class='leftalert_header'>
                    <p>
                    </p>
                </li>
                <li 
                    v-for="(items,indexs) in Administration" 
                    :key="indexs"
                    
                >
                    <div class="displayflex" @click="clickdown(indexs)" >
                        <p>
                            <!-- <img :src="items.img" alt=""> -->
                            <span>{{items.name}}</span>
                            <img class="pullImg" src="./img/pull.png" alt="" v-if="!items.route">
                        </p>
                    </div>
                    <transition name="fade">
                        <ul v-if="items.status" class="click_pull_down">
                            <li v-for="(item,index) in items.children" :key="index" @click="routergo(item.route,indexs,index)" :class="item.active?'activecss':''">
                                <router-link :to="{path:item.route}">{{item.name}}</router-link>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
            <div class="slot_nection">
                <slot></slot>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'leftAll',
    data(){
        return{
            width:'width:200px',
            leftalert:{
                status:false,
                screenWidth:"width:0px"
            },
            fullscreen: false,
            Administration:[
                {
                    name:"首页",
                    img:require("./img/index.png"),
                    static:"index",
                    route:"/index",
                    smallstatus:false,
                    status:false,
                },   
                {
                    name:"列表1",
                    img:require("./img/user_manager.png"),
                    static:"childOne",
                    smallstatus:false,
                    status:false,
                    children:[
                        {
                            name:"列表1",
                            route:"/childOne/one",
                            active:false
                        },
                        {
                            name:"列表2",
                            route:"/childOne/two",
                            active:false
                        },
                    ],
                },
                {
                    name:"列表2",
                    img:require("./img/user_manager.png"),
                    static:"childTwo",
                    smallstatus:false,
                    status:false,
                    children:[
                        {
                            name:"列表1",
                            route:"/childTwo/one",
                            active:false
                        },
                        {
                            name:"列表2",
                            route:"/childTwo/two",
                            active:false
                        },
                    ],
                },
            ]
        }
    },
    mounted:function(){
        // this.watchwindow()
        this.redirectroute()
    },
    methods:{
        // 定向路由
        redirectroute:function(){
            let tabbar = this.$route.path.split('/')[1]
            let tabbarlist = this.$route.path
            if(!this.leftalert.status){
                this.Administration.map((items,I)=>{
                    if(items.static === tabbar){
                        items.status = true
                    }else{
                        items.status = false
                    }
                    if(items.children){
                        items.children.map((item,i)=>{
                            if(item.route === tabbarlist){
                                item.active = true
                            }else{
                                item.active = false    
                            }
                        })
                    }
                })
            }else{
                this.Administration.map((items,I)=>{
                    items.status = false
                    if(items.static === tabbar){
                        items.smallstatus = true
                    }else{
                        items.smallstatus = false
                    }
                    if(items.children){
                        items.children.map((item,i)=>{
                            if(item.route === tabbarlist){
                                item.active = true
                            }else{
                                item.active = false    
                            }
                        })
                    }
                })
            }
        },
        // 抽屉
        clickdown:function(indexs){
            this.Administration[indexs].status = !this.Administration[indexs].status
            this.Administration[indexs].route?this.$router.push({path:this.Administration[indexs].route}):""
            // 监听列表高度
            var el = document.querySelector('.click_pull_down')
            if(el){
                el.style.setProperty('--max-height', el.scrollHeight + 'px')
            }else{

            }
            // 监听列表高度
        },
        // 子路由跳转
        routergo:function(route,indexs,index){
            this.Administration.map((items,I)=>{
                if(items.children){
                    items.children.map((itemsmall,ismall)=>{
                        if(indexs === I && index === ismall){
                            itemsmall.active = true
                        }else{
                            itemsmall.active = false
                        }
                    })
                }
            })
            this.$router.push(route)
        },
        // 监听窗口
        watchwindow:function(){
            const that = this
            let timer = true
            document.body.clientWidth<1040?
            that.leftalert.status = true:
            that.leftalert.status = false
            window.onresize = () => {
                return (() => {
                    if(timer){
                        timer = false
                        setTimeout(()=>{
                            timer = true
                            // 监听宽度
                            that.leftalert.screenWidth = document.body.clientWidth
                            // 判断宽度为小于1000时 开启左浮框
                            that.leftalert.screenWidth<1040?
                            that.leftalert.status = true:
                            that.leftalert.status = false
                            // 重置左侧栏的样式
                            that.redirectroute()
                        },500)
                    }
                })()
            }
        },
        // 全屏事件
        handleFullScreen:function() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        // 伸缩按钮
        telesCoping:function(){
            if(this.width==='width:200px'){
                this.width='width:40px'
                this.leftalert.status = true
            }else{
                this.width = 'width:200px'
                this.leftalert.status = false
                this.leftalert.screenWidth = 'width:0px'
            }
        },
        // hover
        alertlitte:function(){
            if(this.leftalert.status){
                this.leftalert.screenWidth = 'width:200px'
            }
        },
        // 关闭hover
        closealert:function(){
            if(this.leftalert.status){
                this.leftalert.screenWidth = 'width:0px'
            }
        }
    },
    watch:{
       
    }
}
</script>
<style scoped lang="scss">
@import "./css/index.scss";
</style>
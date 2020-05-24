<template>
    <div class="leftallapp">
        <ul class="leftall">
            <li v-for="(items,indexs) in Administration" :key="indexs">
                
                <div class="displayflex" @click="clickdown(indexs,'big')" >
                    <p>
                        <img :src="items.img" alt="">
                        <span>{{items.name}}</span>
                    </p>
                    <img src="./img/pull.png" alt="" v-if="!items.route">
                </div>
                <transition name="fade">
                    <ul v-if="items.status">
                        <li v-for="(item,index) in items.children" :key="index" @click="routergo(item.route,indexs,index)" :class="item.active?'activecss':''">
                            <router-link :to="{path:item.route}">{{item.name}}</router-link>
                        </li>
                    </ul>
                </transition>
            </li>
        </ul>
        <ul class="leftalert" v-if="leftalert.status">
            <li v-for="(items,indexs) in Administration" :key="indexs">
                <div class="displayflex" @click="clickdown(indexs,'small')" >
                    <p>
                        <span>{{items.name}}</span>
                    </p>
                    <img src="./img/pull.png" alt="" v-if="!items.route">
                </div>
                <transition name="fade">
                    <ul v-if="items.smallstatus">
                        <li v-for="(item,index) in items.children" :key="index" @click="routergo(item.route,indexs,index)" :class="item.active?'activecss':''">
                            <router-link :to="{path:item.route}">{{item.name}}</router-link>
                        </li>
                    </ul>
                </transition>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'leftAll',
    data(){
        return{
            leftalert:{
                status:false,
                screenWidth:document.body.clientWidth
            },
            Administration:[
                {
                    name:"首页",
                    img:require("./img/index.png"),
                    static:"index",
                    smallstatus:false,
                    status:false,
                    route:"/index",
                },   
                {
                    name:"用户管理",
                    img:require("./img/user_manager.png"),
                    static:"usermanager",
                    smallstatus:false,
                    status:false,
                    children:[
                        {
                            name:"用户管理",
                            route:"/usermanager/customerlist",
                            active:false
                        },
                    ],
                },
                {
                    name:"车辆管理",
                    static:"carmanager",
                    img:require("./img/car_manager.png"),
                    smallstatus:false,
                    status:false,
                    children:[
                        {
                            name:"车辆列表",
                            route:"/carmanager/carlist",
                            active:false
                        },
                    ]
                },
                {
                    name:"互助管理",
                    static:"mutualmanager",
                    img:require("./img/mutual_manager.png"),
                    smallstatus:false,
                    status:false,
                    children:[
                    	{
                            name:"互助列表",
                            route:"/mutualmanager/mutuallist",
                            active:false
                        },
                    ]
                },
                {
                    name:"理赔管理",
                    static:"settlementOfClaimsManager",
                    img:require("./img/settlement_manager.png"),
                    smallstatus:false,
                    status:false,
                    children:[
                    	// {
                        //     name:"理赔申请列表",
                        //     route:"/settlementOfClaimsManager/settlementOfClaimsApplyList",
                        //     active:false
                        // },
                        {
                            name:"理赔订单列表",
                            route:"/settlementOfClaimsManager/settlementOfClaimsOrderList",
                            active:false
                        },
                    ]
                },
                // {
                //     name:"商家管理",
                //     static:"businessmanager",
                //     img:require("./img/business_manager.png"),
                //     smallstatus:false,
                //     status:false,
                //     children:[
                //     	{
                //             name:"商家列表",
                //             route:"/businessmanager/businesslist",
                //             active:false
                //         },
                //     ]
                // },
                {
                    name:"代理商管理",
                    static:"agentmanager",
                    img:require("./img/business_manager.png"),
                    smallstatus:false,
                    status:false,
                    children:[
                    	{
                            name:"代理商列表",
                            route:"/agentmanager/agentlist",
                            active:false
                        },
                        {
                            name:"商家提现列表",
                            route:"/agentmanager/withdrawalapplication",
                            active:false
                        },
                        // {
                        //     name:"提现记录",
                        //     route:"/agentmanager/withdrawalrecord",
                        //     active:false
                        // },
                    ]
                },
                {
                    name:"优惠券管理",
                    static:"couponmanager",
                    img:require("./img/coupon_manager.png"),
                    smallstatus:false,
                    status:false,
                    children:[
                    	{
                            name:"优惠券列表",
                            route:"/couponmanager/couponlist",
                            active:false
                        },
                    ]
                },
				{
				    name:"区域管理",
				    static:"regionmanager",
				    img:require("./img/region_manager.png"),
				    smallstatus:false,
				    status:false,
				    children:[
				    	{
				            name:"区域管理列表",
				            route:"/regionmanager/regionlist",
				            active:false
				        },
				    ]
				},
            ]
        }
    },
    mounted:function(){
        this.watchwindow()
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
        clickdown:function(indexs,fn){
            fn === 'big'&&document.body.clientWidth>1040?
            this.Administration[indexs].status = !this.Administration[indexs].status:
            this.Administration[indexs].smallstatus = !this.Administration[indexs].smallstatus
            this.Administration[indexs].route?
            this.$router.push({path:this.Administration[indexs].route}):
            ""
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
        }
    },
    watch:{
        "leftalert.screenWidth":function(val){
            if(val<1040){
                this.leftalert.status = true
            }else{
                this.leftalert.status = false
            }
        }
    }
}
</script>
<style scoped>
@import "./css/leftall.scss";
</style>
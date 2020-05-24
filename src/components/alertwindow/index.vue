<template>
    <transition name="njl_alerttransition">
        <div v-if="status" 
            class="njl_alertwindow" 
            id="moveDiv"  
            @mousemove="mousemove"
            @mousemove.prevent="mousemove"
            style
            >
            <div class="njl_header"
                @mousedown="mousedown" 
                @mouseup="mouseup"
            >
                <span>{{text}}</span>
                <img src="./img/close.png" alt="" @click="close">
            </div>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
        return{
            flags: false,
            // left: "25%", top: "25%" ,
            position: {x:"0",y:"0" },
            nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
        }
    },
    props:{
        status:Boolean,
        text:String,
    },
    computed:{
        closestatus:function(){
            return this.status
        }
    },
    methods:{
        // mousedown  当在屏幕上按下手指时触发
        // mousemove  当在屏幕上移动手指时触发
        // mouseup 当在屏幕上抬起手指时触发
        mousedown:function(){
            this.flags = true;
            let touch;
            if(event.touches){
                touch = event.touches[0];
            }else {
                touch = event;
            }
            this.position.x = touch.clientX;
            this.position.y = touch.clientY;
            this.dx = moveDiv.offsetLeft;
            this.dy = moveDiv.offsetTop;
        },
        mousemove:function(){
            if(this.flags){
                let touch ;
                if(event.touches){
                    touch = event.touches[0];
                }else {
                    touch = event;
                }
                this.nx = touch.clientX - this.position.x;
                this.ny = touch.clientY - this.position.y;
                this.xPum = this.dx+this.nx;
                this.yPum = this.dy+this.ny;
                //添加限制：只允许在屏幕内拖动
                
                // const maxWidth = document.body.clientWidth - moveDiv.offsetWidth;//屏幕宽度减去悬浮框宽高
                // const maxHeight = document.body.clientHeight - moveDiv.offsetHeight -80;
                // if (this.xPum < 0) { //屏幕x限制
                //     this.xPum = 0;
                // } else if (this.xPum>maxWidth) {
                //     this.xPum = maxWidth;
                // }
                // if (this.yPum < -80) { //屏幕y限制
                //     this.yPum = -80;
                // } else if (this.yPum>maxHeight) {
                //     this.yPum = maxHeight;
                // }
                moveDiv.style.left = this.xPum+"px";
                moveDiv.style.top = this.yPum +"px";
                //阻止页面的滑动默认事件
                document.body.addEventListener('touchmove', function(e){
                    e.preventDefault();
                }, { passive: false });
            }
        },
        mouseup:function(){
            this.flags = false;
        },
        // 关闭弹窗
        close:function(){
            this.$store.state.alertwindow = false
            this.$emit('close',false)
        }
    },

}
</script>

<style lang="scss" scoped>
    @import './css/index.scss';
</style>
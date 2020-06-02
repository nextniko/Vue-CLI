<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// 接口与枚举
import {ajax_interface} from "@/assets/js/interface/index.js"
// 阿里云oss上传图片
import { aliupload } from '@/assets/js/upload/uploadimg' 
// 时间处理格式
import { formatDate } from '@/assets/js/date/index'
export default {
  data(){
    return{

    }
  },
  mounted:function(){
    // this.api()
  },
  methods:{
    api:function(){
      ajax_interface({
        url:"interceone",
        type:"post",
        datatype:"json",
        data:{
          aaa:"1",
          bb:"2"
        }
      })
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(res)
      })
    }
  },
  
}
</script>
<style lang="scss">
</style>

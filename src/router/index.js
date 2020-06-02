import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path:"/",
    name:"首页",
    component: resolve => require(["../views/index/index.vue"],resolve),
  },
  {
    path:"/watcher",
    name:"后台管理主屏",
    redirect:"childindex",
    component: resolve => require(["../views/watcher/index/index.vue"],resolve),
    children:[
      {
        path:"/childindex",
        name:"主页",
        component: resolve => require(["../views/watcher/childindex/index.vue"],resolve),
      },
      {
        path:"/childOne/one",
        name:"childOne子页面1",
        component: resolve => require(["../views/watcher/childOne/one/index.vue"],resolve),
      },
      {
        path:"/childOne/two",
        name:"childOne子页面2",
        component: resolve => require(["../views/watcher/childOne/one/index.vue"],resolve),
      },
      {
        path:"/childTwo/one",
        name:"childTwo子页面1",
        component: resolve => require(["../views/watcher/childTwo/two/index.vue"],resolve),
      },
      {
        path:"/childTwo/two",
        name:"childTwo子页面2",
        component: resolve => require(["../views/watcher/childTwo/two/index.vue"],resolve),
      },
    ]
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;

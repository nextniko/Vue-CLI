
import router from './index'
import store from "../store/index";
// 头部加载框
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
const that =this
// NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
    // NProgress.start()
    next()
})
router.afterEach(() => {
    // NProgress.done()
    // finish progress bar
})

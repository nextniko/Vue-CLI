module.exports = {
    lintOnSave:false,
    publicPath:'./',
    outputDir:"../production",
    productionSourceMap: false,
    assetsDir: 'static',
    devServer:{
        proxy:{
            "/api":{
                target:"http://192.168.0.46:8089",
                changeOrigin:true,
                pathRewrite:{
                '^/api':"/"
                }
            }
        }
    },
    css: {
        // scss引入全局
        loaderOptions: {
            sass: {
                // 新版之后 属性变为prependData
                prependData: `@import "@/assets/css/common/common.scss";`
            }
        }
    },
    // 在exports中添加，这里很关键，不配置不行
    transpileDependencies: ['element-ui'],
    chainWebpack: config => {// 优化配置
        config.devtool('none')  // webpack内关闭sourceMap
        config.optimization.minimize(true);
        config.optimization.splitChunks({ 
            chunks: 'all',
            cacheGroups: {
                // 拆分Vue
                vue: {
                    test: /[\\/]node_modules[\\/]vue[\\/]/,
                    name: 'chunk-vue'  
                },
                // 拆分Element
                element: {
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                    name: 'chunk-element'
                },
                // 拆分vant
                vant: {
                    test: /[\\/]node_modules[\\/]vant[\\/]/,
                    name: 'chunk-vant'
                }
            }
        })
    }
}
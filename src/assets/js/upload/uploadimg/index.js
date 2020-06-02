import OSS from 'ali-oss'
let region= 'oss-cn-shenzhen'
let accessKeyId = "LTAI4GGuA322mwwbBnNSVhzy"
let accessKeySecret= 'ivsABRr4IfYlm2ZZYNUlTyiAiqzU5b'
let _this = this
function random_string(len){
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = ''; 　　
    for (let i = 0; i < len; i++) { 　　
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    } 
    return pwd; 
}
//jyb-tbhuzhu
export function aliupload(data){
    // data.file 图片资源
    // data.bucket 储存路径
    // data.url 储存子路径
    let files = data.file
    const client = new OSS({
        region: region,
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        bucket: data.bucket
    })
    let random_name = data.url + new Date().getTime() + '.' + random_string() + '_' + data.file.name.split('.').pop()

    // 上传
    return new Promise(function(resolve,reject){
        client.multipartUpload(random_name, files, 
            // {
            //     progress: function* (percentage) {
            //         // 上传进度
            //         _this.percentage = percentage
            //         console.log(_this.percentage)
            //     }
            // }
        )
        .then(res=>{
            // 上传完成 
            const url = `http://${data.bucket}.oss-cn-shenzhen.aliyuncs.com/`+ res.name;
            return resolve(url)
        })
        .catch(err=>{
            return reject(err)
        })
    })
    
}
import axios from 'axios'
import Qs from 'qs'
import store from '../../../store/index'
// 接口请求路径集

const urlAll= {
	'interceone':'/user/app/demoone', //试例1
	'intercetwo':'/user/app/demotwo' //试例2
}
// 枚举接口函数

function enumerationUrl(urlName){
	for(let i in urlAll){
		if(i === urlName){
			return urlAll[i]
		}
	}
}

// 基本接口 
// url 接口路径  
// type 传输方式 ('post','get')
// datatype 传输数据的类型  ('json','')
// data 传输数据 (data:{})
// class 加载样式的改变 ('','template')
const myAxios = axios.create({
	baseURL : "http://192.168.0.46:8061",
	timeout : 10000,
});
// 请求拦截器 判断请求方式处理请求头与请求数据 
myAxios.interceptors.request.use( 
	(config) =>{
		return config;
	}, 
	(err) => {
		return Promise.reject(err);
	}
);
myAxios.interceptors.response.use(
	(response) => {
		return Promise.resolve(response);
	}
);
export function ajax_interface(config){
	let head = ""
	let url = enumerationUrl(config.url)
	// 传值
	let data = config.data
	// 方法
	let method = config.type
	// 数据类型
	let datatype = config.datatype
	// 数据传输方法
	let datamethod 
	// 加载状态的样式选择
	config.class?store.state.localLoading=true:store.state.Loading = true
	let headers= {}
	// 方法判断
	if(datatype !=="json" && datatype !=="JSON"){
		switch(method){
			case "post"||"POST":
				head = 'application/x-www-form-urlencoded'
				data = Qs.stringify(data);
				datamethod = "data"
			break;
			case "get"||"GET":
				head = 'application/json;charset=UTF-8'
				datamethod = "params"
			break;
			default:
	
			break
		}
	}else{
		data = JSON.stringify(data);
		head = 'application/json;charset=UTF-8'
		datamethod = "data"
	}
	// token验证
	// if(token!==""){
	// 	headers={
	// 		'Content-Type':head,
	// 		'token':token
	// 	}
	// }else{
	// 	headers={
	// 		'Content-Type':head,
	// 	}
	// }
	return myAxios({
		url,
		method,
		[datamethod]:data,
		headers
	})
	.then(res=>{
		store.state.Loading = false
		return Promise.resolve(res.data)
	})
	.catch(err=>{
		store.state.Loading = false
		return Promise.reject(err)
	})
}

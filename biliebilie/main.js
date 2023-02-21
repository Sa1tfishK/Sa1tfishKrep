import App from './App'
// import '@/assets/iconfont.js'
import footerVue from './components/footer.vue'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.component('footerVue',footerVue)

//全局属性


//公共方法
Vue.prototype.$back = function(){
	uni.navigateBack()
}
Vue.prototype.$tobookdetail = function(n){
	uni.navigateTo({
		url:'/pages/index/bookdetail?id='+n
	})
}
Vue.prototype.$tocomic = function(e,n,i,t){
	uni.navigateTo({
		url:'/pages/index/comic?num='+e+'&bn='+n+'&id='+i+'&tt='+t
	})
}
Vue.prototype.$tolist = function(e,n,i){//点击进入目录
	uni.navigateTo({
		url:'/pages/index/list?num='+e+'&bn='+n+'&id='+i
	})
}
Vue.prototype.$change = function(i,t){
	uni.chooseImage({
		count: 1,
		sourceType: ['album'],
		success: function (res) {
		//console.log(res.tempFilePaths)
		//console.log(this.id)
			uni.uploadFile({
				url:'http://192.168.1.5:90/test/changehead',
				name:'img',
				filePath:res.tempFilePaths[0],
				formData:{
					name:i,
					ctype:t
				},
				success:(res) => {
					console.log(res)
					location.reload()
				},
				fail: (err) => {
					console.log(err)
				},
			})						
		}
	});
}
Vue.prototype.$topresslist = function(i){
	uni.navigateTo({
		url:"/pages/index/presslist?id="+i
	})
}


App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}

// #endif
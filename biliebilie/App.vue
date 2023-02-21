
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let token= uni.getStorageSync('token');
			let base_login_name = uni.getStorageSync('user');
			 if (token && base_login_name) {
				 //存在则关闭启动页进入首页
				// #ifdef APP-PLUS
				plus.navigator.closeSplashscreen();
				// #endif
		    } else {
				//不存在则跳转至登录页
		        uni.reLaunch({
		            url: "/pages/index/login",
    			    success: () => {
							// #ifdef APP-PLUS
				       plus.navigator.closeSplashscreen();
							// #endif
				    }
			  	})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="less">
	
	/*每个页面公共css */
	
</style>

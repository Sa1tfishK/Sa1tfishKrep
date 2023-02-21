<template>
	<view class="login">
		<view class="logtop">
			<image src="../../static/yhyuan.svg"></image>
			<label>用户登录</label>
		</view>
		<view class="logbot">
			<uni-easyinput prefixIcon="person-filled" v-model="username" placeholder="请输入账号"></uni-easyinput>
			<uni-easyinput type="password" prefixIcon="locked-filled" v-model="userpwd" placeholder="请输入密码"></uni-easyinput>
			<view>
				<button @click="login()">登录</button>
				<button @click="toreg()">注册</button>
			</view>
			<label>忘记密码？</label>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				username:'',
				userpwd:''
			}
		},
		onBackPress() {
		    uni.showModal({
		        title: '提示',
		        content: '是否退出应用？',
		        success: function(res) {
		            if (res.confirm) {
		            // 退出当前应用，改方法只在App中生效  
		                plus.runtime.quit();
		            } else if (res.cancel) {
		                console.log('用户点击取消');
		            }
		        },
			});
		    return true //return true的意思是禁止返回到上一个界面
		},
		methods:{
			login(){
				uni.request({
					url:'http://192.168.1.5:90/test/login',
					data:{
						iduser:this.username,
						pwduser:this.userpwd
					},
					success: (res) => {
						console.log(res)
						if(res.data.message=='登录成功'){
							//localStorage.setItem('token',res.data.token)
							uni.setStorage({key:'token',data:res.data.token}),
							uni.setStorage({key:'user',data:this.username}),
							uni.navigateTo({
								url:'/pages/index/index'
							})
						}
					}
				})
			},
			toreg(){
				uni.navigateTo({
					url:'/pages/index/register'
				})
			}
			// tjwt(){
			// 	uni.request({
			// 		url:'http://192.168.1.5:90/test/testjwt',
			// 		data:{
			// 			name:this.username
			// 		},
			// 		success:(res) => {
			// 			console.log(res)
			// 			localStorage.setItem('token',res.data.token)
			// 			uni.setStorage({
			// 				key:'token',
			// 				data:res.data.token
			// 			})
			// 			uni.navigateTo({
			// 				url:'/pages/index/test'
			// 			})
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="less">
	.login{
		height: 750px;
		background-color: #f5f5f5;
		.logtop{
			height: 40%;
			background-color: #323232;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-bottom-left-radius: 28%;
			border-bottom-right-radius: 28%;
			image{
				height: 100px;
				width: 100px;
			}
			label{
				color: white;
			}
		}
		.logbot{
			height: 40%;
			margin-top: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			::v-deep .uni-easyinput{height: 45px;width: 300px;flex: none;}
			view{
				display: flex;
				width: 100%;
				button{width: 35%;}
			}
		}
	}
</style>
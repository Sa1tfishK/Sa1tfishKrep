<template>
	<view class="register">
		<view class="regtop">
			<label>用户注册</label>
		</view>
		<view class="regbot">
		    <view>
				<label>账&numsp;&numsp;&numsp;号：</label>
				<uni-easyinput prefixIcon="person-filled" v-model="iduser" placeholder="请输入账号"></uni-easyinput>
			</view>
			<view>
				<label>昵&numsp;&numsp;&numsp;称：</label>
				<uni-easyinput prefixIcon="person-filled" v-model="nickname" placeholder="请输入昵称"></uni-easyinput>
			</view>
			<view>
			    <label>密&numsp;&numsp;&numsp;码：</label>
				<uni-easyinput type="password" prefixIcon="locked-filled" v-model="pwd" placeholder="请输入密码"></uni-easyinput>
			</view>
			<view>
			    <label>确认密码：</label>
			    <uni-easyinput type="password" prefixIcon="locked-filled" v-model="conpwd" placeholder="请确认密码"></uni-easyinput>
			</view>
			<view>
				<button>确认注册</button>
				<button @click="$back()">返回登陆</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				iduser:'',
				nickname:'',
				pwd:'',
				conpwd:''
			}
		}
	}
</script>

<style lang="less">
	.register{
		height: 750px;
		background-color: #f5f5f5;
		.regtop{
			height: 18%;
			background-color: #323232;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-bottom-left-radius: 28%;
			border-bottom-right-radius: 28%;
			label{color: white;font-size: 20px;}
		}
		.regbot{
			height: 70%;
			margin-top: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			::v-deep .uni-easyinput{height: 45px;width: 280px;flex: none;}
			view{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				button{width: 35%;}
			}
		}
	}
</style>
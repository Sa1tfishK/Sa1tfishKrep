<template>
	<view class="setting">
		<view class="setnav">
			<uni-icons type="left" color="white" size="25" @click="$back()"></uni-icons>
			<label>设置</label>
		</view>
		<view class="btnlist">
			<button class="btn" style="margin-bottom: 10px;" @click="$change(id,'')">
				<view>
					<view><uni-icons type="image" color="#1296db" size="20"></uni-icons><label>头像</label></view>
				</view>
				<view>
					<image style="margin: 10px;width: 50px;height: 50px;border-radius: 50%;" :src="'http://192.168.1.5:90/'+id+'.jpg'"></image><uni-icons type="forward" size="20"></uni-icons>
				</view>
			</button>
			
			<button class="btn" style="margin-bottom: 10px;">
				<view>
					<view><uni-icons type="person-filled" color="#1296db" size="20"></uni-icons><label>昵称</label></view>
				</view>
				<view>
					<label>{{name}}</label><uni-icons type="forward" size="20"></uni-icons>
				</view>
			</button>
			
			<button class="btn" style="margin-bottom: 10px;" @click="dialogToggle()">
				<view>
					<view><uni-icons type="person-filled" color="#1296db" size="20"></uni-icons><label>退出登录</label></view>
				</view><uni-icons type="forward" size="20"></uni-icons></button>
			
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog cancelText="关闭" confirmText="同意" title="提示" content="确定退出登录？" @confirm="dialogConfirm"
				></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default{
		onLoad:function(option){
			this.name=option.name
			this.id = uni.getStorageSync('user')
		},
		data(){
			return{
				id:'',
				name:'',
			}
		},
		methods:{
			dialogToggle() {
				this.$refs.alertDialog.open()
			},
			dialogConfirm(){
				uni.removeStorageSync('user')
				uni.navigateTo({
					url:'/pages/index/login'
				})
			}
		}
	}
</script>

<style lang="less">
	.setting{
		height: 750px;
		background-color: #f5f5f5;
		.setnav{
			background-color: #303030;
			height: 70px;
			width: 100%;
			padding-top: 20px;
			position: fixed;
			top: 0;
			z-index: 1;
			display: flex;
			align-items: center;
			color: white;
			::v-deep .uni-icons{margin-left: 10px;margin-right: 20px;}
		}
		.btnlist{
			position: relative;
			top: 100px;
			.btn{
				display: flex;
				font-size: 15rpx;
				align-items: center;
				justify-content: space-between;
				view{display: flex;align-items: center;label{margin: 0 10px;font-size: 15px;}}
			}
		}
	}
</style>
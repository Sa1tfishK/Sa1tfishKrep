<template>
	<view class="my">
		<image class="bimg" :src="'http://192.168.1.5:90/'+id+'b.jpg'"></image>
		<view class="userview">
			<image class="uimg" :src="'http://192.168.1.5:90/'+id+'.jpg'"></image>
			<view>
				<label>{{name}}</label>
			</view>
		</view>
		<view class="btnlist">
			<button class="btn" style="margin-bottom: 10px;" @click="$change(id,'b')">
				<view>
					<view><uni-icons type="image" color="#1296db" size="20"></uni-icons><label>背景图片</label></view>
				</view><uni-icons type="forward" size="20"></uni-icons></button>
			<button class="btn" @click="tobrow()">
				<view>
					<view><uni-icons type="wallet" color="#55007f" size="20"></uni-icons><label>浏览记录</label></view>
				</view><uni-icons type="forward" size="20"></uni-icons></button>
			<button class="btn" style="margin-bottom: 10px;">
				<view>
					<view><uni-icons type="map" color="#19ab23" size="20"></uni-icons><label>我的书单</label></view>
				</view><uni-icons type="forward" size="20"></uni-icons></button>
			<button class="btn" @click="openshare()">
				<view>
					<view><uni-icons type="paperclip" color="#ff5500" size="20"></uni-icons><label>分享应用</label></view>
				</view><uni-icons type="forward" size="20"></uni-icons></button>
			<button class="btn" style="margin-bottom: 10px;">
				<view>
					<view><uni-icons type="cloud-upload-filled" color="#00aaff" size="20"></uni-icons><label>上传作品</label></view>
				</view><uni-icons type="forward" size="20"></uni-icons></button>
		    <button class="btn" @click="tosetting(name)">
				<view>
					<view><uni-icons type="gear-filled" size="20"></uni-icons><label>设置</label></view>
				</view><uni-icons type="forward" size="20"></uni-icons></button>
		</view>
	    <view>
				<!-- 分享示例 -->
			<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
				<uni-popup-share></uni-popup-share>
		    </uni-popup>
		</view>
	    <footerVue menu='2'></footerVue>
	</view>
</template>

<script>
	
	export default{
	    data(){
			return{
				id:'',
				name:'',
				token:''
			}
		},
		onLoad:function(){
		    uni.getStorage({
				key:'token',
				success: (res) => {
					this.token=res.data
				}
			})
			this.inituser()
		},
		methods:{
	         inituser(){
				 uni.getStorage({
				 	key:'user',
				 	success: (res) => {
						this.id = res.data
				 		uni.request({
				 			url:'http://192.168.1.5:90/test/tgetuser',
							header: {Authorization:'Bearer '+this.token},
							data:{
								iduser:this.id
							},
							success: (res) => {
								//console.log(res.data)
								if(res.data.msg=='刷新成功！'){
									this.token=res.data.newtoken
									uni.setStorageSync('token',res.data.newtoken)
									this.inituser()
								}else{
									this.name=res.data[0].username
								}
							}
				 		})
				 	}
				 })
			 },
			 tosetting(n){
				 uni.navigateTo({
				 	url:'/pages/my/setting?name='+n
				 })
			 },
			 tobrow(){
				 uni.navigateTo({
				 	url:'/pages/my/browse'
				 })
			 },
			 openshare(){
				 this.$refs.share.open()
			 }
		}
	}
</script>

<style lang="less">
	.my{
		background-color: #e8e8e8;
		height: 100%;
		width: 100%;
		.bimg{
			width: 100%;
			filter: blur(1px);
		}
		.userview{
			
			width: 120px;
			position: relative;
			bottom: 150px;
			left: 33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 17px;
			font-weight: 600;
			.uimg{
				border-radius: 50%;
				height: 100px;
				width: 100px;
			}
		}
		.btnlist{
			position: relative;
			bottom: 124px;
			.btn{
				display: flex;
				font-size: 15rpx;
				align-items: center;
				justify-content: space-between;
				view{display: flex;align-items: center;label{margin-left:10px;font-size: 15px;}}
			}
		}
	}
</style>
<template>
	<view class="browse">
		<view class="brownav">
			<uni-icons type="left" size="25" color="white" @click="$back()"></uni-icons>
			<label>浏览记录</label>
			<uni-icons type="trash" size="25" color="white" @click="dialogToggle()"></uni-icons>
		</view>
		<view class="browcontent" v-show="browlist!=''">
			<view class="browbook" :style="{'margin-bottom':index+1 == browlist.length ? '50px':''}"  v-for="(item,index) in browlist" :key="index" @click="$tobookdetail(item.id)">
				<image :src="'http://192.168.1.5:90/'+item.id+'.jpg'"></image>
				<view>
					<text style="font-size: 20px;">{{item.name}}</text>
					<text style="color: slategray;"><uni-icons type="reload" size="16"></uni-icons> 最近阅读至 第{{item.num}}话</text>
				</view>
			</view>
		</view>
		<view class="nobrow" v-show="browlist==''">
			<label>用户暂无浏览记录</label>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog cancelText="关闭" confirmText="同意" title="提示" content="是否清空浏览记录？" @confirm="trashbrow()"
				></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default{
		onLoad:function(){
			this.initbrow()
		},
		data(){
			return{
				browlist:[]
			}
		},
		methods:{
			initbrow(){
				var a = uni.getStorageSync('user')+'histroy'
				this.browlist=uni.getStorageSync(a)
				console.log(this.browlist)
			},
			trashbrow(){
				this.browlist=[]
				var a = uni.getStorageSync('user')+'histroy'
				uni.removeStorage({
					key:a
				})
			},
			dialogToggle() {
				this.$refs.alertDialog.open()
			}
		}
	}
</script>

<style lang="less">
	.browse{
		height: 750px;
		background-color:#f5f5f5;
		.brownav{
			background-color: #303030;
			height: 70px;
			width: 100%;
			padding-top: 20px;
			position: fixed;
			top: 0;
			z-index: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: white;
			::v-deep .uni-icons{margin-left: 10px;margin-right: 20px;}
		}
		.browcontent{
			padding-top: 90px;
			.browbook{
				background-color: white;
				padding: 2px 5px;
				display: flex;
				image{height: 140px;width: 100px;margin-right: 10px;}
				view{
					display: flex;
					height: 120px;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;
				}
			}
		}
		.nobrow{
			padding-top: 100px;
			height: 600px;
			display: flex;
			align-items: center;
			justify-content: center;
			label{font-size: 20px;}
		}
	}
</style>
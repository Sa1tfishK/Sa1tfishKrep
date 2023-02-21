<template>
	<view class="content">
		<view class="box-bg">
			<uni-nav-bar @clickRight="tosea()" class="mynav" height="100px" dark shadow rightIcon="search">
				<view class="uni-px-5">
					<uni-data-checkbox mode="tag" v-model="radio3" selectedColor="black" selectedTextColor="white" :localdata="sex"></uni-data-checkbox>
				</view>
			</uni-nav-bar>
		</view>
		<scroll-view class="indexsc" scroll-y="true">
		    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="bookshelf" :style="{'padding-bottom':index+1 == comics.length ? '50px':''}" v-for="(item,index) in comics" :key="index">
				<image :src="'http://192.168.1.5:90/'+item.idbook+'.jpg'"></image>
				<view>
					<text>{{item.name}}</text>
					<text>最新：第{{item.total}}话</text>
				</view>
				<uni-icons @click="open(item)" type="more-filled" size="25"></uni-icons>
			</view>
			</mescroll-body>
		</scroll-view>
		<uni-popup ref="popup" type="bottom">
			<view class="inpop">
				<view>
					<view>
						<image :src="'http://192.168.1.5:90/'+popup.idbook+'.jpg'" style="width: 100px;height: 150px;"></image>
						<view>
							<label>作者：{{popup.author}}</label>
							<label>类型：{{popup.type}}</label>
							<label>状态：{{popup.state}}</label>
						</view>
					</view>
					<button @click="$tobookdetail(popup.idbook)" style="width: 60px;height: 40px;font-size: 15px;">详情</button>
				</view>
				<view>
					<view>
						<uni-icons type="chat" size="30" @click="$topresslist(popup.idbook)"></uni-icons>
						<label>查看书评</label>
					</view>
					<view>
						<uni-icons type="trash" size="30"></uni-icons>
						<label>移出书架</label>
					</view>
					<view>
						<uni-icons type="cloud-download" size="30"></uni-icons>
						<label>缓存管理</label>
					</view>
				</view>
			</view>
		</uni-popup>
		<footerVue menu="0"></footerVue>		
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		onLoad:function(){
			uni.getStorage({
				key:'token',
				success: (res) => {
					this.token=res.data
				}
			})
			this.initshelf()
		},
		data() {
			return {
				radio3:0,
				popup:[],
				token:'',
				sex:[{text:'漫画',value:0},{text:'小说',value:1}],
				comics:[]
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
		methods: {
            tosea(){
				uni.navigateTo({
					url:'/pages/index/search'
				})
			},
			open(n){
				this.popup=n
				this.$refs.popup.open()
			},
			initshelf(){
				uni.getStorage({
					key:'user',
					success: (res) => {
						//console.log(res.data)
						uni.request({
							url:'http://192.168.1.5:90/test/tgetusershelf',
							header: {Authorization:'Bearer '+this.token},
							data:{
								iduser:res.data,
								booktype:'1'
							},
							success: (res) => {
								if(res.data.msg=='刷新成功！'){
									this.token=res.data.newtoken
									this.initshelf()
								}else{
									this.comics=res.data.reverse()
								}
								//console.log(this.comics)
							}
						})
					}
				})
			},
			downCallback(){
				this.initshelf()
				this.mescroll.resetUpScroll();
			},
			upCallback(page){
				this.mescroll.endByPage(0,1) 
			}
		}
	}
</script>

<style lang="less">
	.content {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		.box-bg{
			.mynav{
				.uni-px-5{
					width: 100%;
					display: flex;
					padding-top: 20px;
					align-items: center;
					justify-content: center;
					.uni-data-checklist{display: flex;justify-content: center;}
					::v-deep .checklist-box{margin: 0;}
					::v-deep.uni-navbar__header-btns-right{padding-top: 20px;}
					::v-deep .checklist-text{font-size: 17px;line-height: 20px;}
				}
			}
		}
		.indexsc{
			height: 610px;
			.bookshelf{
				height: 150px;
				margin: 10px;
				display: flex;
				align-items: center;
				border-bottom: 1px #f5f5f5 solid;
				image{height: 140px;width: 100px;margin-right: 10px;}
				::v-deep .uni-icons{position: absolute;right: 5px;}
				view{
					display: flex;
					height: 70%;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;
				}
			}
		}
		.inpop{
			background-color: white;
		    display: flex;
			flex-direction: column;
			view:nth-child(1){
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10px;
				view:nth-child(1){
					display: flex;
					justify-content: flex-start;
					width: 80%;
					view{display: flex;flex-direction: column;margin-left: 10px;}
				}
			}
			view:nth-child(2){
				display: flex;
				justify-content: space-around;
				view{display: flex;flex-direction: column;font-size: 10px;justify-content: flex-start;}
			}
		}
	}

</style>

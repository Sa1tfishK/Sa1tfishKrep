<template>
	<view class="search">
		<uni-nav-bar @clickLeft="$back()" leftIcon="left" leftWidth="20px">
			<view class="input-view">
				<uni-data-select
				        v-model="value"
				        :localdata="seatype"
				        @change="change"
				      ></uni-data-select>
				<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
					<input confirm-type="search" @focus="inithistory()" @input="onKeyInput" class="nav-bar-input" type="text" placeholder="输入搜索关键词"
						@confirm="seacon" />
			</view>
			<block slot="right">
				<view class="city" @click="seacon(seadetail)">
					搜索
				</view>
			</block>
		</uni-nav-bar>
		<view class="hotsea" v-show="show">
			<label>热门搜索</label>
			<view class="hotkey">
				<view v-for="(item,index) in hkey" :key="index" @click="search(item)"><uni-tag :style="{'background-color':'rgba(255, 53, 3,'+(1.1-(index+1)/10)+')','color':'black','border-color':'rgba(0,0,0,'+(index+1)/10+')'}" :text="item" type="primary"></uni-tag></view>
			</view>
		</view>
		<view class="seahistory" v-show="show">
			<view class="sea_top">
				<label>搜索记录</label>
			    <view @click="cleardata"><uni-icons class="input-uni-icon" type="trash" size="18" color="#999" />清空记录</view>
			</view>
			<view class="tag">
				<view v-for="item in historylist" :key="index" @click="search(item)">
					<uni-tag :text="item" type="primary" />
				</view>
			</view>
		</view>
		<view class="result" v-show="!show">
			<scroll-view class="resscr" scroll-y="true">
				<view class="resbook" v-for="item in resultlist" :key="index" @click="$tobookdetail(item.id)">
					<image :src="'http://192.168.1.5:90/'+item.id+'.jpg'"></image>
					<view>
						<label class="bname">{{item.name}}</label>
						<uni-tag :inverted="true" :text="item.type" />
						<label class="bauthor">{{item.author}}</label>
						<text class="blurb">{{item.blurb}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:0,
				show:true,
				seatype:[{value:0,text:'漫画'},{value:1,text:'小说'}],
				hkey:[],//热门搜索列表
				seadetail:'',
				resultlist:[],//搜索结果列表
				historylist:[]//搜索历史记录列表
			}
		},
		onLoad:function(){
			this.gethotkey()
			this.getdata()
		},
		methods:{
			gethotkey(){
				uni.request({
					url:'http://192.168.1.5:90/test/tredis',
					success: (res) => {
						//console.log(res)
						this.hkey=res.data.key
					}
				})
			},
			onKeyInput(event){
			    this.seadetail = event.target.value
			},
			inithistory(){
				this.getdata()
				this.show=true
			},
			search(k){
				this.show=false
				uni.request({
					url:'http://192.168.1.5:90/test/tsearch',
					data:{
						seakey:k
					},
					success: (res) => {
						this.resultlist=res.data
						console.log(this.seadetail)
						console.log(this.resultlist)
					}
				})
			},
			seacon(){
				this.getdata()
				console.log(this.historylist)
				if(this.historylist!=null){
					this.historylist.unshift(this.seadetail)
					var newarr =  [...new Set(this.historylist)]
					this.setdata(newarr)
					// console.log(newarr)
				}else{
					this.historylist=[]
					this.historylist.unshift(this.seadetail)
					this.setdata(this.historylist)
				}
				this.search(this.seadetail)
			},
			setdata(n){//记录历史记录缓存
				uni.setStorage({
					key:'history',
					data:n
				})
			},
			getdata(){//获得历史记录缓存
				uni.getStorage({
					key:'history',
					success: (res) => {
						console.log(res.data)
						this.historylist=res.data
					}
				})
			},
			cleardata(){//清除历史记录缓存
				uni.clearStorage();
				this.historylist=null
			}
		}
	}
</script>

<style lang="less">
	.search{
		background-color: #f5f5f5;
		width: 100%;
		height: 750px;
		::v-deep .uni-navbar__header{padding-top: 35px;}
		::v-deep .uni-navbar__header-container {
			overflow: visible;
		}
		.input-view{
			display: flex;
			align-items: center;
			::v-deep .uni-stat__select{margin-right: 15px;}
		}
		.hotsea{
			height: 30%;
			margin-top: 5px;
			background-color: white;
			padding: 5px 10px;
			label{font-size: 14px;font-weight: 600;color: #535353;}
			.hotkey{
				padding: 10px;
                height: 80%;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				// background-color: rgba(255, 53, 3, 1.0);
				view{width: 150px;}
				::v-deep .uni-tag{margin:0 10px;}
			}
		}
		.seahistory{
			height: 50%;
			margin-top: 10px;
			background-color: white;
			padding: 5px 10px;
			.tag{
				display: flex;
				flex-wrap:wrap;
				align-content: flex-start;
				height: 80%;
				padding: 5px 10px;
				::v-deep .uni-tag{margin-right: 10px;}
				view{height: 25px;margin-bottom: 10px;}
			}
			.sea_top{
				display: flex;justify-content: space-between;
				margin-bottom: 5px;
				label{font-size: 14px;font-weight: 600;color: #535353;}
				view{display: flex;align-items: center; color:slategray; font-size: 5px;}
			}
		}
	    .result{
			height: 700px;
			.resscr{
				height:650px;
				.resbook{
					margin: 6px 5px;
					background-color: white;
					display: flex;
					view{
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding: 0px 10px;
						width: 70%;
						::v-deep .uni-tag{width: fit-content;color:black;}
						.bname{color: brown;}
						.bauthor{font-size: 12px;color: #535353;}
						.blurb{font-size: 10px;height: 33%;overflow: hidden;color: slategrey;}
					}
					image{height: 140px;width: 100px;}
				}
			}
		}
	
	}
</style>
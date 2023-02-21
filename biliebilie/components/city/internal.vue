<template>
	<view class="internal">
		<v-tabs color="#303030" lineColor="#303030" activeColor="#303030" bgColor="white"
		  height="50px" v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
		  <swiper class="interswi" :current="activeTab" @change="sw($event)">
			  <swiper-item>
				  <uni-segmented-control :current="ranknum1" :values="items" style-type="button"
				  	active-color="#303030" @clickItem="onClickItem1" />
					<scroll-view class="internalscr" scroll-y="true">
						<view class="in_book" @click="$tobookdetail(item.id)" v-for="(item,index) in interbooks" :key='index' :style="{'padding-bottom': index+1 == interbooks.length ? '70px':'5px'}">
							<image :src="'http://192.168.1.5:90/'+item.id+'.jpg'"></image>
							<view class="right">
								<view>
									<label style="">{{item.name}}</label>
									<label style="margin-right: 20px;font-size: 20px;">{{item.score}}</label>
								</view>
								<view>
									<label style="font-size: 10px;color: silver;">{{item.author}}</label>
									<label style="margin-right: 5px;color: #ff5500;">{{Math.round(item.mood/10000)}}w人气</label>
								</view>
								<view style="height: 50px;overflow: hidden;color:#666666;">
									<label style="height: 42px;font-size: 10px;">简介：{{item.blurb}}</label>
								</view>
							</view>
						</view>
					</scroll-view>
			  </swiper-item>
			  <swiper-item>
			  	<uni-segmented-control :current="ranknum2" :values="items" style-type="button"
			  		active-color="#303030" @clickItem="onClickItem2" />
			  </swiper-item>
		  </swiper>
	</view>
</template>

<script>
	export default{
		created(){
			this.getinternal(0)
			
		},
		data(){
			return{
				activeTab:0,
				current:0,
				ranknum1:0,
				ranknum2:0,
				tabs:['漫画','小说'],
				items:['热血','校园','修仙','搞笑','恋爱','恐怖','推理'],
				interbooks:[]
			}
		},
		methods:{
			changeTab(index) {
			    this.activeTab=index
			},
			sw(e){
				let index = e.detail.current
				this.current=index
			},
			onClickItem1(e){
				if (this.ranknum1 !== e.currentIndex) {
					    this.ranknum1 = e.currentIndex
						//console.log(this.items[this.ranknum])
						this.getinternal(this.ranknum1)
			    }
			},
			onClickItem2(e){
				if (this.ranknum2 !== e.currentIndex) {
					    this.ranknum2 = e.currentIndex
			    }
			},
			getinternal(n){
				uni.request({
					url:'http://192.168.1.5:90/test/tgetinternal',
					data:{
						type:this.items[n]
					},
					success: (res) => {
						//console.log(res.data)
						this.interbooks=res.data
						//console.log(this.interbooks.lenght)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.internal{
		height: 650px;
		.interswi{
			height: 100%;
			padding: 10px;
			background-color: white;
			padding-bottom: 200px;
			::v-deep .segmented-control{height: 20px;}
			.internalscr{
				height: 600px;
				padding: 5px;
				.in_book{
					display: flex;
					width: 100%;
					height: 135px;
					align-items: center;
					margin-bottom: 5px;
					image{height: 130px;width: 100px;}
					.right{
						display: flex;width: 71%;
						height: 90%;
						flex-direction: column;
						justify-content: space-around;
						padding-left:7px ;
						padding-top: 5px;
						view{display: flex;justify-content: space-between;align-items: center;}
					}
				}
			}
		}
	}
</style>
<template>
	<view class="rank">
		<v-tabs color="#303030" lineColor="#303030" activeColor="#303030" bgColor="white"
		  height="50px" v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
		<swiper class="rankswi" :current="activeTab" @change="sw($event)">
			<swiper-item>
				<uni-segmented-control :current="ranknum" :values="items" style-type="button"
					active-color="#303030" @clickItem="onClickItem" />
					<scroll-view class="rankscr" scroll-y="true">
						<view class="rankdetail" v-if="ranknum === 0">
								<label class="num">1</label>
								<image src="../../static/20230109164118.png"></image>
								<view>
									<label class="name">我推的孩子</label>
									<label class="autor">作者：赤坂明</label>
								</view>
								<label class="blurb">简介：“在演艺圈里，谎言就是武器。 ”
						作为妇产科医生在小城市工作的五郎，每天都过着与演艺圈无缘的生活。
						另一方面，他“推”的偶像星野爱开始登上明星之列。
						如此这般的两人实现了最糟糕的相遇，从此命运的齿轮开始转动。</label>							
						    </view>
						<view class="rankdetail" v-if="ranknum === 0">
								<label class="num">1</label>
								<image src="../../static/20230109164118.png"></image>
								<view>
									<label class="name">我推的孩子</label>
									<label class="autor">作者：赤坂明</label>
								</view>
								<label class="blurb">简介：“在演艺圈里，谎言就是武器。 ”
						作为妇产科医生在小城市工作的五郎，每天都过着与演艺圈无缘的生活。
						另一方面，他“推”的偶像星野爱开始登上明星之列。
						如此这般的两人实现了最糟糕的相遇，从此命运的齿轮开始转动。</label>							
						    </view>
						<view class="rankdetail" v-if="ranknum === 0">
								<label class="num">1</label>
								<image src="../../static/20230109164118.png"></image>
								<view>
									<label class="name">我推的孩子</label>
									<label class="autor">作者：赤坂明</label>
								</view>
								<label class="blurb">简介：“在演艺圈里，谎言就是武器。 ”
						作为妇产科医生在小城市工作的五郎，每天都过着与演艺圈无缘的生活。
						另一方面，他“推”的偶像星野爱开始登上明星之列。
						如此这般的两人实现了最糟糕的相遇，从此命运的齿轮开始转动。</label>							
						    </view>
						<view class="rankdetail" style="padding-bottom: 0px;" v-if="ranknum === 0">
								<label class="num">1</label>
								<image src="../../static/20230109164118.png"></image>
								<view>
									<label class="name">我推的孩子</label>
									<label class="autor">作者：赤坂明</label>
								</view>
								<label class="blurb">简介：“在演艺圈里，谎言就是武器。 ”
						作为妇产科医生在小城市工作的五郎，每天都过着与演艺圈无缘的生活。
						另一方面，他“推”的偶像星野爱开始登上明星之列。
						如此这般的两人实现了最糟糕的相遇，从此命运的齿轮开始转动。</label>							
						    </view>
						<view class="more"><button>查看全部排行</button></view>
					</scroll-view>
			</swiper-item>
			<swiper-item>
				<uni-segmented-control :current="ranknum" :values="items" style-type="button"
					active-color="#303030" @clickItem="onClickItem" />
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				activeTab:0,
				current:0,
				ranknum:0,
				tabs:['漫画','小说'],
				items:['年榜','月榜','周榜']
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
			onClickItem(e){
				if (this.ranknum !== e.currentIndex) {
					    this.ranknum = e.currentIndex
			    }
			}
		}
	}
</script>

<style lang="less">
	.rank{
		height: 650px;
		.rankswi{
			height: 100%;
			padding: 10px;
			background-color: white;
			padding-bottom: 200px;
			.rankscr{height: 650px;}		
			.rankdetail{
				height: 30%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 10px;
				image{
					height: 150px;
					width: 100px;
				}
				.num{margin: 0 10px;font-size: 20px;}
				view{
					display: flex;
					flex-direction: column;
					.name{}
					.autor{font-size: 10px;color: slategrey;margin-top: 10px;}
				}
				.blurb{
					width: 30%;
					height: 100%;
					overflow: hidden;
					font-size: 14px;
				}
			}
			.more{
				padding-bottom: 150px;
				button{background-color: white;color: #9f9f9f;font-size: 15px;}
				button::after{border: none;}
			}
		}
	}
</style>
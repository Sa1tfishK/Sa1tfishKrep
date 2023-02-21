<template>
	<view class="culling">
		<scroll-view scroll-y="true" class="scroll-Y" 
							>
		    <view class="novelcull" v-for="items in cull" :key="items">
			    <view>
				    <label>{{items}}</label>
				    <view>
					    更多
					    <uni-icons type="forward" size="20" ></uni-icons>
				    </view>
			    </view>
				<scroll-view class="scroll-Y1" scroll-y="true">
				    <view class="content">
						<view v-for="item in items=='漫画精选' ? comics.two:items=='热血漫画精选' ? comics.three:comics.one " :key="item.index" class="book" @click="$tobookdetail(item.id)">
							<image :src="'http://192.168.1.5:90/'+item.id+'.jpg'"></image>
							<view>
								<label class="nameL">{{item.name}}</label>
								<label class="autorL">{{item.author}}</label>
								<label class="popularL">{{Math.round(item.mood/10000)}}W 人气</label>
							</view>
						</view>
				    </view>
				</scroll-view>
		    </view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		created() {
			this.getcullcomic()
		},
		data(){
			return{
				cull:['小说精选','漫画精选','热血漫画精选'],
				comics:{
					one:[],
					two:[],
					three:[]
				}
			}
		},
		methods:{
			// upper: function(e) {
			// 	console.log(e)
			// },
			// lower: function(e) {
			// 	console.log(e)
			// },
			// scroll: function(e) {
			// 	console.log(e)
			// 	this.old.scrollTop = e.detail.scrollTop
			// },
			getcullcomic(){
				uni.request({
					url:'http://192.168.1.5:90/test/tgetcomic',
					success:(res)=>{
						this.comics.one=res.data
					}
				})
				uni.request({
					url:'http://192.168.1.5:90/test/tgetcullcomic',
					success:(res)=>{
						this.comics.two=res.data
					}
				})
				uni.request({
					url:'http://192.168.1.5:90/test/tgetsomecomic',
					data:{
						type:'热血'
					},
					success:(res)=>{
						this.comics.three=res.data
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.scroll-Y {
		height: 600px;
	}
	.novelcull{
		height: 300px;
		background-color: white;
		margin: 5px;
		padding: 5px;
		view{display: flex;justify-content: space-between;
		     view{display: flex;align-items: center;}
		}
		.scroll-Y1{
			height: 250px;
		    .content{
			    // padding-top: 190px;
			    flex-flow:row wrap;
			    // height: 100%;
			    margin: 0 10px;
			    align-content: space-around;
			    justify-content: space-around;
			    image{height: 100px;width: 80px;margin: 5px;}
			    .book{
				    display: flex;
				    align-items: center;
					margin-bottom: 10px;
				    // height: 50%;
				    width: 45%;
				    view{
					    // height: 50%;
					    display: flex;
					    flex-direction: column;
						align-items: flex-start;
						width: 42%;
					    .nameL{font-size: 15px;}
					    .autorL{font-size: 10px;color: slategray;}
					    .popularL{font-size: 10px;color:#ff5500;}
				    }
			    }
			}
		}
	}
</style>
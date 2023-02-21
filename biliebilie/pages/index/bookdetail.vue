<template>
	<view class="bookdetail">
		
		<scroll-view class="bdscroll" lower-threshold="500px" upper-threshold="100px" scroll-y="true"  @scrolltolower="scrollbot()" @scrolltoupper="scrolltop()">
            <view class="bdnav" :style="{'background-color':vcolor == 0 ? '#303030':'rgba(255,255,255,0)'}">
				<uni-icons type="left" size="25" color="white" @click="$back()"></uni-icons>
				<label :style="{'color':vcolor == 0 ? 'white':'rgba(255,255,255,0)'}">{{book.name}}</label>
				<uni-icons type="redo" size="25" color="white"></uni-icons>
			</view>
			<image :src="'http://192.168.1.5:90/'+id+'.jpg'"></image>
			<view class="v1">
				<view class="v1left">
					<label>作者：{{book.author}}</label>
					<label>类型：{{book.type}}</label>
					<label>状态：{{book.state}}</label>
				</view>
				<view class="v1right" style="display: flex;flex-direction: column;">
					<label>评分</label>
					<label>{{book.score}}</label>
					<uni-rate  size="10" readonly="true" value="4.5" />
				</view>
			</view>
			<view class="v2">
				<text>{{book.blurb}}</text>
			</view>
			<view class="v3" @click="$tolist(book.total,book.name,id)">
				<label>目录</label>
				<label style="width: 60%;font-size: 10px;">最近更新至  {{book.total}}话</label>
				<uni-icons type="right" size="20"></uni-icons>
			</view>
			<view class="v4">
				<view class="v4top">
					<label>评论区</label>
					<uni-icons type="compose" size="20" @click="topresslist(id)"></uni-icons>
				</view>
				<view class="v4mid">
					<view class="press" v-for="item in arr.slice(0,3)" :key="item.index">
						<image :src="'http://192.168.1.5:90/'+item.lssuer+'.jpg'"></image>
						<view>
							<label>用户123</label>
							<text style="font-size: 13px;">{{item.content}}</text>
							<uni-tag :circle="true" text="回复"
							custom-style="width:10%;background-color: #e8e8e8; border-color: #e8e8e8; color: black;">
							</uni-tag>
						</view>
						<uni-icons type="hand-up" size="20"></uni-icons>{{item.good}}
					</view>
					<view class="nopress" v-show="arr==''">
						<label>暂无用户评论</label>
					</view>
				</view>
				<button @click="topresslist(id)">查看更多</button>
			</view>
			<view class="detailfooter">
				<button @click="addshelf()" v-if="iscol==0">加入书架</button>
				<button @click="del(id,'1')" v-else>移出书架</button>
				<button>立即阅读</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		onLoad:function(option){
			this.id=option.id
			this.initbook(option.id)
			this.getpress(option.id)
		},
		data(){
			return{
				vcolor:1,
				id:'',
				iscol:'',
				book:[],
				press:[],
				arr:[]
			}
		},
		methods:{
			scrolltop(){
				this.vcolor=1
			},
			scrollbot(){
				this.vcolor=0
			},
			topresslist(i){//点击进入评论区
				uni.navigateTo({
					url:"/pages/index/presslist?id="+i
				})
			},
			initbook(i){//初始化书籍数据
				uni.request({
					url:'http://192.168.1.5:90/test/tgetcomicid',
					data:{
						id:i,
						userid:uni.getStorageSync('user'),
						type:'1'
					},
					success: (res) => {
						//console.log(res.data)
						this.book=res.data.content[0]
						this.iscol=res.data.msg
					}
				})
			},
			getpress(n){
				uni.request({
					url:'http://192.168.1.5:90/test/tgetpress',
					data:{
						parent:n
					},
					success: (res) => {
						//console.log(res.data)
						this.press=res.data
						this.arr = this.ss(null)
					}
				})
			},
			ss(j){//递归处理评论数据
				var arr = []
				for(var i=0;i<this.press.length;i++){
					if(this.press[i].answer==j){
						arr.push(this.press[i])
						this.press[i].kid=this.ss(this.press[i].idpress)
					}
				}
				return arr
			},
			addshelf(){
				uni.request({
					url:'http://192.168.1.5:90/test/taddshelf',
					method:'POST',
					header: {Authorization:'Bearer '+uni.getStorageSync('token')},
					data:{
						userid:uni.getStorageSync('user'),
						bookid:this.id,
						btype:'1'
					},
					success: (res) => {
						if(res.data.msg=='刷新成功！'){
							uni.setStorageSync('token',res.data.newtoken)
							this.addshelf()
						}else{
							this.iscol=1
							console.log(res.data)
						}
					}
				})
			},
			del(b,t){
				uni.request({
					url:'http://192.168.1.5:90/test/tdelshelf',
					method:'DELETE',
					header: {Authorization:'Bearer '+uni.getStorageSync('token')},
					data:{
						userid:uni.getStorageSync('user'),
						bookid:b,
						btype:t
					},
					success: (res) => {
						if(res.data.msg=='刷新成功！'){
							uni.setStorageSync('token',res.data.newtoken)
							this.del()
						}else{
							this.iscol=0
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.bookdetail{
		height: 100%;
		background-color:#f5f5f5;
		.bdscroll{
			height: 710px;
			.bdnav{
				height: 70px;
				width: 100%;
				padding-top: 20px;
			    position: fixed;
				top: 0;
				z-index: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				::v-deep .uni-icons{margin: 0 10px;}
			}
			image{height: 70%;width: 100%;}
			view{display: flex;margin-bottom: 5px;background-color: white;}
			.v1{
				height: 15%;
				align-items: center;
				justify-content: space-between;
				.v1left{display: flex;flex-direction: column;margin: 5px 10px;justify-content: center;}
				.v1right{margin: 5px 10px;justify-content: center;align-items: center;width: 30%;}
			}
			.v2{overflow: hidden;font-size: 10px;color:#939393;padding: 5px;}
			
			.v3{
				padding: 10px;
				align-items: center;
				height: 5%;
				justify-content: space-between;
				label{color: #303030;}
			}
			.v4{
				flex-direction: column;
				height: 60%;
				.v4top{
					display: flex;
					justify-content: space-between;
					width: 98%;
					margin: 5px;
					height: 10%;
					align-items: center;
					border-bottom: 1px #f5f5f5 solid;
				}
				.v4mid{
					height: 80%;
					flex-direction: column;
					.press{
						display: flex;
						height: 30%;
						margin: 5px;
						border-bottom: 1px #f5f5f5 solid;
						view{
							margin: 0 5px;
							width: 70%;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
						}
						image{height: 50px;width: 50px;border-radius: 50%;}
					}
					.nopress{
						display: flex;
						height: 90%;
						margin: 5px;
						border-bottom: 1px #f5f5f5 solid;
						justify-content: center;
						align-items: center;
					}
				}
				button::after{border: none;}
				button{background-color: white;font-size: 14px;color: #6b6b6b;}
			}
			.detailfooter{
				position: fixed;
				bottom: 0;
				width: 100%;
				button{width: 50%;background-color: #f5f5f5;color: #10a2ed;font-weight: 100;}
				button:nth-child(2){
					background-color: #10a2ed;
					color: white;
				}
				button::after{border: none;}
			}
		}
	}
</style>
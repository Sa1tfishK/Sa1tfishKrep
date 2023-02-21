<template>
	<view class="presslist">
		<view class="plnav">
			<uni-icons type="left" color="white" size="25" @click="$back()"></uni-icons>
			<label>评论区</label>
		</view>
		<view class="up">
			<label>全部评论</label>
			<uni-data-checkbox mode="tag" v-model="checkpre" selectedColor="black" selectedTextColor="white" :localdata="newhot"></uni-data-checkbox>
		</view>
		<view class="down" v-show="arr!=''">
			<scroll-view class="plscr" scroll-y="true">
				<mescroll-body ref="mescrollRef" :down="{use:false}" @up="upCallback" :up="upOption">
					<view class="press" v-for="item in arr" :key="item.index">
						<view class="precon">
							<image :src="'http://192.168.1.5:90/'+item.lssuer+'.jpg'"></image>
							<view class="premid">
								<label>用户{{item.lssuer}}</label>
								<text style="font-size: 13px;">{{item.content}}</text>
								<uni-tag :circle="true" text="回复"
								custom-style="width:10%;background-color: #e8e8e8; border-color: #e8e8e8; color: black;" @click="ff(item.lssuer,item.idpress)">
								</uni-tag>
							</view>
							<uni-icons type="hand-up" size="20"></uni-icons>{{item.good}}
						</view>
						<pressitem style="height: fit-content;display: flex;flex-direction: column;margin-left: 30px;" v-on:backHome='ff' v-if="item.kid!=''" :press="item.kid" :parent="item.lssuer" rank="2"></pressitem>
					</view>
				</mescroll-body>
			</scroll-view>
		</view>
		<view class="nopress" v-show="arr==''">
			<label>暂无用户评论</label>
		</view>
		<view class="pressfooter">
			<uni-easyinput ref="huifu" prefixIcon="chat" v-model="value" :placeholder="placeholder" @iconClick="iconClick"
			:focus="f" @blur="nofocus()" @confirm="lssuer()"></uni-easyinput>
			<uni-icons type="paperplane" color="silver" size="25"></uni-icons>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import pressitem from "@/components/pressitem.vue"
	export default{
		mixins: [MescrollMixin],
		components:{
			pressitem
		},
		onLoad:function(option){
			this.id = option.id
			this.getpress(option.id)
		},
		data(){
			return{
				id:'',
				checkpre:0,
				value:null,
				f:false,
				placeholder:'发表你的评论......',
				answer:null,
				newhot:[{text:'最热',value:0},{text:'最新',value:1}],
				upOption:{
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				presslist:[],
				arr:[]
			}
		},
		methods:{
			upCallback(page){
				this.mescroll.endByPage(0,1) 
			},
			getpress(n){
				uni.request({
					url:'http://192.168.1.5:90/test/tgetpress',
					data:{
						parent:n
					},
					success: (res) => {
						this.presslist=res.data
						this.arr=this.ss(null)
						// nconsole.log(this.arr)
					}
				})
			},
			ss(j){
				var arr = []
				for(var i=0;i<this.presslist.length;i++){
					if(this.presslist[i].answer==j){
						arr.push(this.presslist[i])
						this.presslist[i].kid=this.ss(this.presslist[i].idpress)
					}
				}
				return arr
			},
			ff(u,i){
				this.f=true
				this.placeholder='回复用户'+u
				this.answer=i
				console.log(u+'  '+i)
			},
			nofocus(){
				this.f=false
				this.placeholder='发表你的评论......'
				this.answer=null
			},
			lssuer(){
				if(this.value==null){
					// alert('请输入内容！')
				}else{
					uni.request({
						url:'http://192.168.1.5:90/test/tlssuer',
						method:"PUT",
						data:{
							parent:this.id,
							lssuer:uni.getStorageSync('user'),
							content:this.value,
							answer:this.answer,
							good:0,
						},
						success: (res) => {
							console.log(res.data)
							this.getpress(this.id)
							this.value=null
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.presslist{
		height: 750px;
		background-color: #f5f5f5;
		.plnav{
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
		.up{
			margin-top: 100px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.uni-data-checklist{display: flex;justify-content: flex-end;}
			::v-deep .checklist-box.uni-label-pointer{margin-right: 0;}
			::v-deep.uni-navbar__header-btns-right{padding-top: 20px;}
			::v-deep .checklist-text{font-size: 17px;line-height: 20px;}
		}
		.down{
			height: 650px;
			.plscr{
				height: 600px;
				.press{
					display: flex;
					flex-direction: column;
					margin: 10px 5px;
					background-color: white;
					border-bottom: 1px #f5f5f5 solid;
					.precon{
						display: flex;
						height: 100px;
						margin: 10px 0px;
						.premid{
							margin: 0 10px;
							width: 70%;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
						}
					}
					image{height: 50px;width: 50px;border-radius: 50%;}
				}
			}
		}
		.nopress{
			height: 650px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.pressfooter{
			background-color: #f5f5f5;
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			width: 98%;
			padding: 5px;
			
		}
	}
</style>
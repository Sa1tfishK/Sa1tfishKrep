<template>
	<view class="footer">
		<button class="btn" @click="clickbtn(0)">
			<uni-icons type="map-filled" :color="this.menu ==0 ? '#10a2ed':''" size="20"></uni-icons>
			<label :style="{'color': this.menu==0 ? '#10a2ed':''}">书架</label>
		</button>
		<button class="btn" @click="clickbtn(1)">
			<uni-icons type="home-filled" :color="this.menu ==1 ? '#10a2ed':''" size="20"></uni-icons>
			<label :style="{'color': this.menu==1 ? '#10a2ed':''}">书城</label>
		</button>
		<button class="btn" @click="clickbtn(2)">
			<uni-icons type="person-filled" :color="this.menu ==2 ? '#10a2ed':''" size="20"></uni-icons>
			<label :style="{'color': this.menu==2 ? '#10a2ed':''}">我的</label>
		</button>
	</view>
</template>

<script>
	export default{
		onLaunch() {
			console.log(this.pageto)
		},
		props:{
			menu:'',
		},
		data(){
			return{
				pageto:['index','city','my']
			}
		},
		methods:{
			clickbtn(e){
				uni.navigateTo({
					url:"/pages/index/"+this.pageto[e]
				})
			}
		}
	}
</script>

<style lang="less">
	
	.footer{
		height: 10%;
		width: 100%;
		background-color: #f5f5f5;
		border-top: 1px #d4d4d4 solid;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		.icon {
		       width: 1em; height: 1em;
		       vertical-align: -0.15em;
		       fill: currentColor;
		       overflow: hidden;
		}
		.btn{
			height: 80%;
			background-color: #f5f5f5;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			label{
				font-size: 10px;
				position: relative;
				bottom: 15px;
			}
		}
		button::after{
			border: none;
		}
	}
</style>
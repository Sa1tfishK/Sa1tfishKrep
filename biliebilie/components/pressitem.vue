<template>
	<view class="pressitem">
		<view class="presss" v-for="item in press" :key="item.index">
			<view class="content">
				<image :src="'http://192.168.1.5:90/'+item.lssuer+'.jpg'"></image>
				<view class="mid">
					<label>用户{{item.lssuer}}<label style="color:dodgerblue;">回复</label>{{parent}}</label>
					<text style="font-size: 13px;">{{item.content}}</text>
					<uni-tag :circle="true" text="回复"
					custom-style="width:12%;background-color: #e8e8e8; border-color: #e8e8e8; color: black;" @click="ffs(item.lssuer,item.idpress)">
					</uni-tag>
				</view>
				<uni-icons type="hand-up" size="20"></uni-icons>{{item.good}}
			</view>
			<pressitem style="height: auto;" v-on:ffs='ffs' v-if="item.kid!=''" :press="item.kid" :parent="item.lssuer" :rank='rank+1'></pressitem>
		</view>
	</view>
</template>

<script>
	export default{
		name:'pressitem',
		props:{
			press:null,
			parent:'',
			rank:''
		},
		data(){
			return{
				
			}
		},
		methods:{
			c(){
				console.log(this.press)
				console.log(this.rank)
			},
			ffs(u,i){
				if(this.rank==2){
				    this.$emit("backHome",u,i)	
				}else{
					this.$emit('ffs',u,i)
				}
			},
		}
	}
</script>

<style lang="less">
.pressitem{
	.presss{
		display: flex;
		flex-direction: column;
		width: 100%;
		border-bottom: 1px #f5f5f5 solid;
		.content{
			display: flex;
			margin: 10px 0px;
			width: 100%;
			.mid{
				margin: 0 10px;
				width: 71%;
				display: flex;
				height: 100px;
				flex-direction: column;
				justify-content: space-between;
			}
		}
		image{height: 50px;width: 50px;border-radius: 50%;}
	}
}
</style>
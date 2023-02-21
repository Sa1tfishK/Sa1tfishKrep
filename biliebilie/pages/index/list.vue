<template>
	<view class="list">
		<view class="listnav">
			<uni-icons type="left" size="25" @click="$back()"></uni-icons>
			<label>{{book.name}}</label>
			<uni-icons v-if="listsort==true" type="arrow-down" size="25" @click="sort()"></uni-icons>
			<uni-icons v-else type="arrow-up" size="25" @click="sort()"></uni-icons>
		</view>
		<view>
			<scroll-view class="listscr" scroll-y="true">
				<text>目录</text>
				<button @click="$tocomic(item,book.name,book.id,book.total)" v-for="item in num" :key="item">第 {{item}} 话</button>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad:function(option){
			for(var i=0;i<option.num;i++){
				this.num.push(i+1)
			}
			this.book.total=option.num
			this.book.name=option.bn
			this.book.id=option.id
		},
		data(){
			return{
				listsort:true,
				book:{
					name:'',
					id:'',
					total:''
				},
				num:[],
			}
		},
		methods:{
			sort(){
				this.listsort=!this.listsort
				this.num.reverse()
			},
		}
	}
</script>

<style lang="less">
	.list{
		height: 750px;
		background-color: #f5f5f5;
		.listnav{
			background-color: white;
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
		.listscr{
			height: 650px;
			padding-top: 100px;
			background-color: #f5f5f5;
			button::after{border: none;}
			text{font-size: 13px;}
			button{
				background-color: white;
				text-align: left;
				border-bottom: 1px #f3f3f3 solid;
			}
		}
	}
</style>
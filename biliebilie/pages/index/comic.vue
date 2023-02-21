<template>
	<view class="comic">
		<view class="comicnav" v-show="show">
			<uni-icons type="back" @click="$back()" color="white" size="25"></uni-icons>
			<label>{{book.name+'  第 '+book.num+' 话'}}</label>
		</view>
		<image @click="open()" style="height: 500px;width: 100%;" v-for="(item,index) in pic" :key="index" :src="item"></image>
		<view class="comicmenu" v-show="show">
			<view>
				<uni-icons type="left" color="white" size="25"></uni-icons>
				<label>上一话</label>
			</view>
			<view @click="next(book.num+1,book.name,book.id,book.total)">
				<label>下一话</label>
				<uni-icons type="right" color="white" size="25"></uni-icons>
			</view>
	    </view>
	</view>
</template>

<script>
	export default{
		onLoad:function(option){
			//console.log(option.num)
			this.book.name=option.bn
			this.book.num=parseInt(option.num)
			this.book.id=option.id
			this.book.total=option.tt
            this.getcomicpic(0)
			this.setbrowse()
		},
		data(){
			return{
				show:false,
				book:{
					name:'',
					num:null,
					id:'',
					total:''
				},
				pic:[],
			}
		},
		methods:{
		    getcomicpic(n){
				uni.request({
					url:'http://192.168.1.5:90/test/tgetmanhua',
					data:{
						num:n
					},
					responseType:"arraybuffer",
					success:(res)=>{
						var p ='data:image/jpg;base64,'+uni.arrayBufferToBase64(res.data)
						this.pic.push(p)
						if(this.pic.length==16){
							return
						}else{
							n++
							this.getcomicpic(n)
						}
					}
				})
			},
			open(){
				this.show=!this.show
			},
			setbrowse(){
				var a = uni.getStorageSync('user')+'histroy'
				var arr = []
				if(uni.getStorageSync(a)==''){
					arr.unshift(this.book)
					console.log(arr)
					uni.setStorage({key:a,data:arr})
				}else{
					arr = uni.getStorageSync(a)
					arr = arr.filter(item => item.id!=this.book.id)//使用数组中的filter过滤掉原浏览历史记录中的记录
					arr.unshift(this.book)//重新从头插入记录
					uni.setStorage({key:a,data:arr})//将浏览记录存入缓存中
					console.log(arr)
				}
			},
			next(e,n,i,t){
				uni.redirectTo({
					url:'/pages/index/comic?num='+e+'&bn='+n+'&id='+i+'&tt='+t
				})
			}
		}
	}
</script>

<style lang="less">
	.comic{
		height: 750px;
		background-color: #f5f5f5;
		.comicnav{
			background-color: #353535;
			width: 100%;
			padding: 10px;
			padding-top: 40px;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			z-index: 1;
			label{color: white;font-size: 15px;margin-left: 10px;}
		}
		.comicmenu{
			background-color: #353535;
			width: 95%;
			padding: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			bottom: 0;
			label{color: white;font-size: 15px;}
			view{display: flex;align-items: center;}
		}
	}
</style>
<template>
	<view class="test">
		<button @click="gettoken">测试</button>
	</view>
</template>

<script>
	export default{
		methods:{
			gettoken(){
				uni.request({
					url:'http://192.168.1.5:90/test/ttt',
					header: {Authorization:'Bearer '+localStorage.getItem('token')},
					data:{
						name:'123'
					},
					success: (res) => {
						if(res.data.msg=='刷新成功！'){
							localStorage.setItem('token',res.data.newtoken)
							this.gettoken()
						}else{
							console.log(res.data)
							console.log(localStorage.getItem('token'))
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.test{}
</style>
<template>
	<view class="city">
		<uni-search-bar placeholder="搜索" bgColor="white" @confirm="search" />
		<v-tabs color="white" lineColor="#10a2ed" activeColor="#10a2ed" bgColor="#303030" 
		  height="50px" v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
	
		
		<swiper class="cityswi" :current="activeTab" @change="sw($event)">
			<swiper-item>
				<cullingVue></cullingVue>
			</swiper-item>
			<swiper-item><internalVue></internalVue></swiper-item>
			<swiper-item>
				<rankVue></rankVue>
			</swiper-item>
			<swiper-item>热血</swiper-item>
			<swiper-item>漫画</swiper-item>
		</swiper>
		<footerVue menu="1"></footerVue>
	</view>
</template>

<script>
	import cullingVue from '../../components/city/culling.vue'
	import rankVue from '../../components/city/rank.vue'
	import internalVue from '../../components/city/internal.vue'
	export default{
		data(){
			return{
				scrollTop: 0,
				activeTab: 0,
				current: 0,
				tabs: ['精选', '国内', '排行', '热血', '漫画', '小说'],
				// atabs: ['精选', '国内', '排行', '热血', '漫画', '小说'],
				cull:['小说精选','漫画精选','热血漫画精选'],
				old: {
					scrollTop: 0
				}
			}
		},
		components:{
			cullingVue,
			rankVue,
			internalVue
		},
		methods:{
			changeTab(index) {
			    this.activeTab=index
		    },
			sw(e){
				let index = e.detail.current
				this.current=index
			},
		}
	}
</script>

<style lang="less">
	.city{
		background-color: #f5f5f5;
		
		height: 100%;
		::v-deep .uni-searchbar{background-color: #303030;padding-top: 35px;}
		::v-deep .uni-searchbar__cancel{color: white;}
		.cityswi{
			height: 700px;
			.scroll-Y {
				height: 650px;
			}
		}
		
	}
</style>
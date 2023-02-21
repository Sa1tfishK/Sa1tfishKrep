<template>
	<view class="score">
		<view class="items" :class="size">
			<view class="item" :style="styleItem" v-for="(item,key) in num">
				<view class="image-box" :class="{animation: displayAnimation&&animationFlag}" @click="scoreTap(key)">
					<template v-if="autoScoreIcon">
						<image class="image" :src="getAutoScoreIcon(index,key)" mode="widthFix"></image>
					</template>
					<template v-else-if="multipleIcons">
						<template v-if="key === index">
							<image class="image" :src="subscriptList[key]" mode="widthFix"></image>
						</template>
						<template v-else-if="key > index">
							<image class="image" :src="background" mode="widthFix"></image>
						</template>
						<template v-else>
							<image class="image" :src="subscriptBeforeList[index]" mode="widthFix"></image>
						</template>
					</template>
					<template v-else>
						<template v-if="key <= index">
							<image class="image" :src="activeBackground" mode="widthFix"></image>
						</template>
						<template v-else>
							<image class="image" :src="background" mode="widthFix"></image>
						</template>
					</template>
				</view>
			</view>
		</view>
		<view class="text" v-if="displayToast" :style="styleText">{{autoToast?getAutoToast(index):toast[index]}}</view>
	</view>
</template>
<script>
	export default {
		/**
		 * ref使用的函数
		 * setAutoToast Function(Function(Int value)) 设置自定义生成提示[value 当前值(下标)]
		 * setAutoScoreIcon Function(Function(Int value,Int index)) 设置自定义生成图标 value 当前值 index 需要生成图标的下标 
		 * 
		 * 函数
		 * @change Function(Int index) 每次点击更改下标时触发函数（下标）
		 * 
		 * 变量
		 * value 当前的值 不支持双向绑定 支持切换
		 * num 图标的数量
		 * styleItem 每个图标的样式 通过margin调节间距 height/width 调节大小 优先级大于size变量
		 * styleText 文本的样式 toast展示的文本
		 * size 图标大小，内置[small,default,large],优先级小于styleItem。当前值可以通过调节styleItem的值来自定义，支持 small 小 / default 默认 / large 大
		 * multipleIcons 是否多图标 [false 生效 background,activeBackground][true 生效 background,subscriptBeforeList,subscriptList]
		 * background 背景图标
		 * activeBackground 突出项的背景图片
		 * subscriptBeforeList 当前下标前展示的图片数组 需：同num变量相同的数组数量
		 * subscriptList 当前下标展示的图片数组 需：同num变量相同的数组数量
		 * displayToast 是否展示提示 默认 true 展示
		 * toast 文字提示 需：同num变量相同的数组数量
		 * displayAnimation 是否显示动画
		 * disabled 是否禁止点击 false 不禁止 true 禁止
		 * 
		 * 注意
		 * 使用toast固定数组提示时需要 数组数量同num一样
		 * 多图标设置时一样 subscriptBeforeList,subscriptBeforeList 数组数量同num一样
		 */
		props: {
			/**
			 * 当前值 -1 空值 0 1分 1 2分...
			 */
			value: {
				type: Number,
				default: -1
			},
			/**
			 * 几个星星 默认5个
			 */
			num: {
				type: Number,
				default: 5
			},
			/**
			 * 每个图标的样式
			 * 通过margin调节间距
			 */
			styleItem: {
				type: Object,
				default: function() {
					return {
						"margin-right": "20rpx"
					};
				}
			},
			/**
			 * 文本的样式
			 */
			styleText: {
				type: Object,
				default: function() {
					return {};
				}
			},
			/**
			 * small 小 / default 默认 / large 大 
			 * 当前值可以通过调节styleItem的值来自定义
			 */
			size: {
				type: String,
				default: "default"
			},
			/**
			 * 是否多图标
			 * false 生效 background,activeBackground
			 * true 生效 background,subscriptBeforeList,subscriptList
			 */
			multipleIcons: {
				type: Boolean,
				default: false
			},
			/**
			 * 背景图片
			 */
			background: {
				type: String,
				default: "/static/starIcon01.png"
			},
			/**
			 * 点击项的背景图片
			 */
			activeBackground: {
				type: String,
				default: "/static/starIcon07.png"
			},
			/**
			 * 当前下标前展示的图片数组
			 */
			subscriptBeforeList: {
				type: Array,
				default: function() {
					return ["/static/starIcon07.png", "/static/starIcon07.png", "/static/starIcon07.png",
						"/static/starIcon08.png", "/static/starIcon09.png"
					];
				}
			},
			/**
			 * 当前下标展示的图片数组
			 */
			subscriptList: {
				type: Array,
				default: function() {
					return ["/static/starIcon02.png", "/static/starIcon03.png", "/static/starIcon04.png",
						"/static/starIcon05.png", "/static/starIcon06.png"
					];
				}
			},
			/**
			 * 是否展示提示 默认 true 展示
			 */
			displayToast: {
				type: Boolean,
				default: true
			},
			/**
			 * 提示
			 */
			toast: {
				type: Array,
				default: function() {
					return ["非常差", "差", "一般", "还可以", "满意"];
				}
			},
			/**
			 * 是否显示动画
			 */
			displayAnimation: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否禁止点击 false 不禁止 true 禁止
			 */
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 动画生成
				animationFlag: true,
				index: -1,
				// 是否会自定义生成提示
				autoToast: false,
				// 自定义的生成提示函数
				autoToastFunc: undefined,
				// 是否自定义生成图标
				autoScoreIcon: false,
				// 自定义的生成提示函数
				autoScoreIconFunc: undefined,
			}
		},
		watch: {
			value() {
				this.index = this.value;
			}
		},
		created() {
			this.index = this.value;
		},
		methods: {
			/**
			 * 获取自定义生成的提示
			 * @param {Number} index
			 */
			getAutoToast(index){
				return this.autoToastFunc(index);
			},
			/**
			 * 设置自定义生成提示
			 * @param {Function(Int index)} func
			 */
			setAutoToast(func){
				if(func){
					this.autoToastFunc = func;
					this.autoToast = true;
				}
			},
			/**
			 * 获取自定义生成图标
			 * @param {Number} value
			 * @param {Number} index
			 */
			getAutoScoreIcon(value,index){
				return this.autoScoreIconFunc(value,index);
			},
			/**
			 * 设置自定义生成图标
			 * @param {Function(Int value,Int index)} func value 当前值 index 需要生成图标的下标
			 */
			setAutoScoreIcon(func){
				if(func){
					this.autoScoreIconFunc = func;
					this.autoScoreIcon = true;
				}
			},
			scoreTap(index) {
				if(this.disabled){
					return ;
				}
				if (this.index === index) {
					return;
				}
				this.animationFlag = false;
				setTimeout(() => {
					this.animationFlag = true;
					this.index = index;
					this.$emit("change", index);
				}, 20);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.score {
		display: flex;
		align-items: center;

		.items {
			display: flex;
			align-items: center;
			margin-right: 20rpx;

			&.small {
				.item {
					.image-box {
						.image {
							width: 35rpx;
							height: 35rpx;
						}
					}
				}
			}

			&.large {
				.item {
					.image-box {
						.image {
							width: 65rpx;
							height: 65rpx;
						}
					}
				}
			}

			.item {
				&:last-of-type {
					margin-right: 0 !important;
				}

				.image-box {
					display: flex;

					&.animation {
						animation: image .3s forwards;
					}

					.image {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}

		}

		.text {
			font-size: 28rpx;
		}
	}

	@keyframes image {
		0% {
			transform: scale(0.8);
		}

		100% {
			transform: scale(1);
		}
	}
</style>

<template>
	<view class="layout" >
		<view class="navbar">
			<view class="statusBar" :style="{height:getStatusBarHeight()+'px'}"></view>
			<view class="titleBar" >
				<view class="title">{{title}}</view>
				<view class="search" @click="goSearch">
					<uni-icons class="icon" type="search" size="18" color="#888"></uni-icons>
					<text class="text">搜索</text>
				</view>
			</view>
		</view>
		
		<view class="fill" style=" "></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getStatusBarHeight } from "@/utils/system.js";

defineProps({
	title:{
		type:String,
		defalut:"壁纸"
	}
})

const goSearch = () => {
	uni.navigateTo({
		url: '/pages/search/search',  
		fail: (err) => {
			console.log('跳转失败:', err);
			// 如果页面不存在，可以提示用户或跳转到其他页面
			uni.showToast({
				title: '搜索功能开发中',
				icon: 'none'
			});
		}
	});
}


</script>

<style lang="scss" scoped>
.layout{
	.navbar{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background:
		linear-gradient(to bottom,rgba(0,0,0,0),#fff 400rpx ),
		linear-gradient(to right,#beecd8 20%, #F4E2D8);
		.statusBar{
			
		}
		.titleBar{
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			
			.title{
				font-size: 22px;
				font-weight: 700;
				color: $text-font-color-1;
			}
			.search{
				width: 220rpx;
				height: 50rpx;
				border-radius: 60rpx;
				background: rgba(255, 255, 255, 0.4);
				border: 1px solid #fff;
				margin-left: 30rpx;
				color: #999;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				.icon{
					margin-left: 5rpx;
				}
				.text{
					padding-left: 10rpx;
				}
			}
		}
	}
	.fill{
		
	}
}
</style>
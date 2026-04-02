<template>
	<view class="themeItem">
		<navigator  :url="`/pages/classlist/classlist?id=${item._id}&name=${item.name}`"   class="box" v-if="!isMore">
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="mask">{{item.name}}</view>
			<view class="tab">{{compareTimestamp(item.updateTime)}}</view>
		</navigator>

		<navigator url="/pages/classify/classify" open-type="reLaunch" class=" box more" v-if="isMore">
			<image class="pic" src="/common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>

		</navigator>
	</view>
</template>

<script setup>
import {compareTimestamp} from "@/utils/common.js"
	defineProps({
		isMore: {
			type: Boolean,
			default: false
		},
		item: {
			type: Object,
			default: () => ({
				name: '默认名称',
				picurl: '/common/images/more.jpg',
				updateTime: new Date().toLocaleString()
			})
		}
	})
	
	
	// const formatRelativeTime=(timestamp)=>{
	//   // 处理非法输入
	//   if (!timestamp || isNaN(timestamp)) {
	//     return "未知时间";
	//   }
	  
	//   // 获取当前时间和目标时间
	//   const currentTime = new Date().getTime();
	//   const targetTime = new Date(timestamp).getTime();
	  
	//   // 计算时间差（毫秒）
	//   let diff = currentTime - targetTime;
	  
	//   // 处理未来时间
	//   if (diff < 0) {
	//     diff = -diff;
	//     return "即将发生";
	//   }
	  
	//   // 定义时间单位（毫秒）
	//   const minute = 1000 * 60;
	//   const hour = minute * 60;
	//   const day = hour * 24;
	//   const month = day * 30; // 简化为30天
	//   const year = month * 12; // 简化为12个月
	  
	//   // 按时间跨度返回不同格式
	//   if (diff < minute) {
	//     return "1分钟内";
	//   } else if (diff < hour) {
	//     const minutes = Math.floor(diff / minute);
	//     return `${minutes}分钟前`;
	//   } else if (diff < day) {
	//     const hours = Math.floor(diff / hour);
	//     return `${hours}小时前`;
	//   } else if (diff < month) {
	//     const days = Math.floor(diff / day);
	//     return `${days}天前`;
	//   } else if (diff < year) {
	//     const months = Math.floor(diff / month);
	//     return `${months}个月前`;
	//   } else {
	//     return "1年前";
	//   }
	// }
</script>

<style lang="scss" scoped>
	.themeItem {
		.box {
			width: 100%;
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;

			.pic {
				width: 100%;
				height: 100%;
			}

			.mask {
				width: 100%;
				height: 70rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				background: rgba(0, 0, 0, 0.2);
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				backdrop-filter: blur(10rpx); //模糊效果
				font-weight: 600;
				font-size: 30rpx;
			}

			.tab {
				position: absolute;
				left: 0;
				top: 0;
				background: rgba(250, 129, 90, 0.7);
				backdrop-filter: blur(20rpx);
				color: #fff;
				font-size: 22rpx;
				padding: 6rpx 14rpx;
				border-radius: 0 0 20rpx 0;
				transform: scale(0.8);
				transform-origin: left top;
			}
		}

		.box.more {
			.mask {
				width: 100%;
				height: 100%;
				flex-direction: column;
			}

			.text {
				font-size: 28rpx;
			}
		}

	}
</style>
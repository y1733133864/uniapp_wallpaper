<template>
	<view class="homeLayout pageBg" >
		<coustom-nav-bar title="推荐"></coustom-nav-bar>
		<!-- 轮播图 -->
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(255,255,255,0.5)"
			indicator-active-color="#fff" autoplay="true" interval="3000"
			circular="true">
				<swiper-item v-for="item in bannerList" :key="item._id">
					<image :src="item.picurl" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告 -->
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20" ></uni-icons>
				<text>公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in noticeList" :key="item._id">{{item.title}}</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="forward" size="16" color="#333"></uni-icons>
			</view>
		</view>
		<!-- 每日推荐 -->
		<view class="select">
			<common-title>
				<template #left>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="20" ></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>
						
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x="">
					<view class="box" v-for="item in randomList" :key="item._id" @click="goPreview(item)">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<!--  专题精选-->
		<view class="theme">
			<common-title>
				<template #left>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" class="more">More+</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" 
				:key="item._id"
				:item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { apiGetBanner,aipGetDayRandom,aipGetNotice,aipGetClassify} from '../../api/apis';


const bannerList=ref([]);
const randomList=ref([]);
const noticeList=ref([]);
const classifyList=ref([]);

// 获取轮播图对象
const getBanner= async ()=>{
	 let res=await apiGetBanner();
	 bannerList.value=res.data.data;
	 // console.log(res);
}


// 获取每日精选图片对象
const getDayRandom= async ()=>{
	let res=await aipGetDayRandom();
	if(res.data.errCode===0){
		randomList.value=res.data.data;
	}
	
}


// 获取壁纸公告列表
const getNotice= async ()=>{
	let res=await aipGetNotice({select:true});
	// console.log(res);
	noticeList.value=res.data.data;
	
}



// 获取专题精选列表
const getClassify= async ()=>{
	let res=await aipGetClassify({
		select:true
	});
	// console.log(res.data.data);
	classifyList.value=res.data.data;
	
}

// 跳转到预览页面
const goPreview=(item)=>{
	console.log(item._id);
	uni.setStorageSync("storgClassList", randomList.value);
	uni.navigateTo({
		url: `/pages/preview/preview?id=${item._id}`
	});
}



getBanner();
getDayRandom();
getNotice();
getClassify();
</script>

<style lang="scss" scoped>
.homeLayout{
	// 轮播图
	.banner{
		width: 750rpx;
		padding: 30rpx 0;
		swiper{
			width: 750rpx;
			height: 340rpx;
			&-item{
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}
	// 公告栏
	.notice{
		width: 690rpx;
		line-height: 80rpx;
		height: 80rpx;
		background: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;
		.left{
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			:deep(){
				.uni-icons{
					color: $brand-theme-color !important;
				}
			}
			text{
				color: $brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center{
			flex: 1;
			swiper{
				height: 100%;
				swiper-item{
					height: 100%;
					font-size: 30rpx;
					color: $text-font-color-3;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.right{
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	// 每日推荐
	.select{
		padding-top: 50rpx;
		.date{
			color: $brand-theme-color;
			display: flex;
			align-items: center;
			:deep(){
				.uni-icons{
					color: $brand-theme-color !important;
				}
			}
			.text{
				margin: 5rpx;
			}
		}
		.content{
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view{
				white-space: nowrap;
				.box{
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.box:last-child{
					margin-right: 30rpx;
				}
			}
		}
	}
	// 专题精选
	.theme{
		padding: 50rpx 0;
		.more{
			font-size: 32rpx;
			color: #888;
		}
		.content{
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns:repeat(3,1fr);
		}
	}
}
</style>

<template>
	<view class="userLayout pageBg">
		<view class="userInfo">
			<view class="avatar">
				<image src="/common/images/preview_small.webp" mode="aspectFill"></image>
			</view>
			<view class="ip">230200139</view>
			<view class="address">来自于：深圳</view>
		</view>

		<view class="section">
			<view class="list">
				<view class="row" url="/pages/classlist/classlist" @click="Tonavigate">
					<view class="left">
						<uni-icons type="download-filled" size="20" ></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text">33</view>
						<uni-icons type="right" size="20"></uni-icons>
					</view>
				</view>
				<view class="row">
					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text">33</view>
						<uni-icons type="right" size="20"></uni-icons>
					</view>
				</view>
				<view class="row">
					<view class="left">
						<uni-icons type="chat-filled" size="20"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<view class="text">33</view>
						<uni-icons type="right" size="20"></uni-icons>
					</view>
				</view>

			</view>
		</view>

		<view class="section">
			<view class="list">
				<view class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<view class="text">33</view>
						<uni-icons type="right" size="15" color="$brand-theme-color"></uni-icons>
					</view>
				</view>
				<view class="row">
					<view class="left">
						<uni-icons type="flag-filled" size="20"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<view class="text">33</view>
						<uni-icons type="right" size="15" color="$brand-theme-color"></uni-icons>
					</view>
				</view>

			</view>


		</view>

	</view>
</template>

<script setup>
const Tonavigate=function(){
	uni.navigateTo({
		url:'/pages/classlist/classlist'
	})
}
</script>

<style lang="scss" scoped>
	.userLayout {
		.userInfo {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50rpx 0;

			.avatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.ip {
				font-size: 44rpx;
				color: $text-font-color-1;
				padding: 20rpx 0 5rpx;
			}

			.address {
				font-size: 28rpx;
				color: $text-font-color-3;
			}
		}

		.section {
			width: 690rpx;
			margin: 50rpx auto;
			border: 1px solid #eee;
			border-radius: 10rpx;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
			.list {
				.row {
					display: flex !important;
					justify-content: space-between !important;
					align-items: center;
					padding: 0 30rpx;
					height: 100rpx;
					border-bottom: 1rpx solid #eee;
					&:last-child {
						border-bottom: 0;
					}
					.left {
						display: flex;
						align-items: center;
						:deep() {
							.uni-icons {
								color: $brand-theme-color !important;
							}
						}

						.text {
							padding-left: 20rpx;
							color: $text-font-color-2 !important;
						}
					}

					.right {
						display: flex;
						align-items: center;

						.text {
							font-size: 28rpx;
							color: $text-font-color-3;
						}

						.uni-icons {
							color: $text-font-color-3
						}
					}
				}
			}
		}
	}
</style>
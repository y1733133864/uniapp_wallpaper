<template>
	<view class="classLayout pageBg">
		<coustom-nav-bar title="分类"></coustom-nav-bar>
		
		<view class="classify">
			<theme-item v-for="item in classifyList" 
			:key="item._id"
			:item="item"
			></theme-item>
		</view>
		
		
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {aipGetClassify} from "@/api/apis.js"
const classifyList = ref([]);

const getClassify =async()=>{
	let res =await aipGetClassify({
		pageSize:15
	});
	classifyList.value = res.data.data;
	console.log(res);
}


getClassify();
</script>

<style lang="scss" scoped>
.classify{
	margin-top: 50rpx; 
	padding: 30rpx;
	display: grid;
	grid-template-columns: repeat(3,1fr);
	gap:15rpx;
}
</style>
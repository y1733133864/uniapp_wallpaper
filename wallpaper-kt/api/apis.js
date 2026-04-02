import {request} from '@/utils/request.js'
export function apiGetBanner(){
	return request({url:'https://tea.qingnian8.com/api/bizhi/homeBanner'})
	/*
	return uni.request({
		url:"https://tea.qingnian8.com/api/bizhi/homeBanner",
		header:{
			"access-key":'160126'
		}
	}) */
}

export function aipGetDayRandom(){
	return request({url:'https://tea.qingnian8.com/api/bizhi/randomWall'})
}

export function aipGetNotice(data={}){
	return request({
		url:'https://tea.qingnian8.com/api/bizhi/wallNewsList',
		data:data
	})
	
}

export function apiGetClassList(data={}){
	return request({
		url:"https://tea.qingnian8.com/api/bizhi/wallList",
		data:data
	})
}

export function apiGetHistoryList(data={}){
	return request({
		url:"https://tea.qingnian8.com/api/bizhi/userWallList",
		data:data
	})
}

export function aipGetClassify(){
	
	return request({url:'https://tea.qingnian8.com/api/bizhi/classify'})
}

export function apiGetSetupScore(data={}){
	return request({
		url:"https://tea.qingnian8.com/api/bizhi/setupScore",
		data:data
	})
}


export function apiWriteDownload(data={}){
	return request({
		url:"https://tea.qingnian8.com/api/bizhi/downloadWall",
		data:data
	})
}


export function apiDetailWall(data={}){
	return request({
		url:"https://tea.qingnian8.com/api/bizhi/detailWall",
		data:data
	})
}

export function apiSearchData(data={}){
	return request({
		url:"https://tea.qingnian8.com/api/bizhi/searchWall",
		data:data
	})
}
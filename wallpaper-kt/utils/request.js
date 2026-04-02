
export function request(config={}){
	let {url,data}=config
	return new Promise((resolve,reject)=>{
		uni.request({
			url:url,
			data:data,
			header:{
				"access-key":'20050920'
			},
			success:res=>{
				if(res.data.errCode===0){
					resolve(res)
				}else if(res.data.errCode===400){
					uni.showModal({
						title:"错误提示",
						content:res.data.errMsg,
						showCancel:false
					})
					reject(res.data)
				}else{
					uni.showToast({
						title:res.data.errMsg,
						icon:'none'
					})
					reject(res.data)
				}
				
			},
			fail:err=>{
				reject(err)
			}
		})
	})
	
}
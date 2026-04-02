
export const getStatusBarHeight = () => {
    const SYSTEM_INFO = uni.getSystemInfoSync();
    console.log('系统信息:', SYSTEM_INFO); // 调试用
    return SYSTEM_INFO.statusBarHeight || 0;
};


export const getSystemInfo = () => {
    return uni.getSystemInfoSync();
};
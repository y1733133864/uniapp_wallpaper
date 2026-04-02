# 🖼️ Vue3 壁纸小程序项目文档

## 📖 项目概述

一款基于 **Vue3 + UniApp** 开发的壁纸类微信小程序，提供壁纸浏览、分类筛选、搜索、个人中心等完整功能。

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Vue 3** | 3.2+ | 前端框架（Composition API） |
| **UniApp** | 最新版 | 跨平台开发框架 |
| **SCSS** | - | CSS 预处理器 |
| **uni-ui** | 最新版 | UI 组件库 |

## 📁 项目结构

```
├── common/                    # 公共资源
│   ├── images/               # 公共图片
│   └── style/                # 公共样式
├── components/               # 组件目录
│   └── theme-item.vue       # 主题分类组件
├── pages/                    # 页面目录
│   ├── index/               # 首页/推荐页
│   ├── classify/            # 分类页面
│   ├── classlist/           # 分类列表页
│   ├── preview/             # 壁纸预览页
│   ├── personal/            # 个人中心
│   └── search/              # 搜索页面
├── utils/                    # 工具函数
│   ├── common.js            # 通用工具函数
│   ├── request.js           # 接口请求封装
│   └── system.js            # 系统信息获取
├── App.vue                   # 应用入口
├── main.js                   # 主入口文件
├── manifest.json             # 应用配置
├── pages.json                # 页面路由配置
└── uni.scss                  # 全局样式变量
```

## 🔧 工具函数模块

### 1. common.js - 通用工具函数

#### 时间戳格式化
```javascript
// 将时间戳转换为相对时间描述
export function compareTimestamp(timestamp) {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - timestamp;

    if (timeDiff < 60000) {
        return '1分钟内';
    } else if (timeDiff < 3600000) {
        return Math.floor(timeDiff / 60000) + '分钟';
    } else if (timeDiff < 86400000) {
        return Math.floor(timeDiff / 3600000) + '小时';
    } else if (timeDiff < 2592000000) {
        return Math.floor(timeDiff / 86400000) + '天';
    } else if (timeDiff < 7776000000) {
        return Math.floor(timeDiff / 2592000000) + '月';
    } else {
        return null;
    }
}
```

#### 错误页面跳转
```javascript
// 页面出错时返回首页
export function gotoHome() {
    uni.showModal({
        title: "提示",
        content: "页面有误将返回首页",
        showCancel: false,
        success: (res) => {
            if (res.confirm) {
                uni.reLaunch({
                    url: "/pages/index/index"
                })
            }
        }
    })
}
```

### 2. request.js - 接口请求封装

```javascript
export function request(config = {}) {
    let { url, data } = config
    
    return new Promise((resolve, reject) => {
        uni.request({
            url: url,
            data: data,
            header: {
                "access-key": '20050920'  // API 密钥
            },
            success: res => {
                if (res.data.errCode === 0) {
                    resolve(res)  // 请求成功
                } else if (res.data.errCode === 400) {
                    // 参数错误，显示模态框
                    uni.showModal({
                        title: "错误提示",
                        content: res.data.errMsg,
                        showCancel: false
                    })
                    reject(res.data)
                } else {
                    // 其他错误，显示提示
                    uni.showToast({
                        title: res.data.errMsg,
                        icon: 'none'
                    })
                    reject(res.data)
                }
            },
            fail: err => {
                reject(err)
            }
        })
    })
}
```

### 3. system.js - 系统信息获取

```javascript
// 获取状态栏高度
export const getStatusBarHeight = () => {
    const SYSTEM_INFO = uni.getSystemInfoSync();
    console.log('系统信息:', SYSTEM_INFO);
    return SYSTEM_INFO.statusBarHeight || 0;
};

// 获取系统信息
export const getSystemInfo = () => {
    return uni.getSystemInfoSync();
};
```

## 📱 页面功能说明

### 1. 推荐页（首页）

**功能描述**：展示主题分类卡片，支持点击跳转到对应分类列表。

**核心组件**：`theme-item.vue`

#### theme-item 组件代码

```vue
<template>
    <view class="themeItem">
        <!-- 普通分类项 -->
        <navigator 
            :url="`/pages/classlist/classlist?id=${item._id}&name=${item.name}`"
            class="box" 
            v-if="!isMore"
        >
            <image class="pic" :src="item.picurl" mode="aspectFill"></image>
            <view class="mask">{{ item.name }}</view>
            <view class="tab">{{ compareTimestamp(item.updateTime) }}</view>
        </navigator>
        
        <!-- 更多按钮项 -->
        <navigator 
            url="/pages/classify/classify" 
            open-type="reLaunch"
            class="box more" 
            v-if="isMore"
        >
            <image class="pic" src="/common/images/more.jpg" mode="aspectFill"></image>
            <view class="mask">
                <uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
                <view class="text">更多</view>
            </view>
        </navigator>
    </view>
</template>

<script setup>
import { compareTimestamp } from "@/utils/common.js"

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
            backdrop-filter: blur(10rpx);  // 毛玻璃效果
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
```

### 2. 分类页面

**功能描述**：展示所有壁纸分类，支持按分类筛选。

**页面路径**：`/pages/classify/classify`

### 3. 分类列表页

**功能描述**：根据分类 ID 展示该分类下的壁纸列表。

**页面路径**：`/pages/classlist/classlist`

#### 核心代码

```javascript
// 获取分类列表网络数据
const getClassList = async () => {
    let res;
    
    // 根据是否有 classid 判断请求类型
    if (queryParams.classid) 
        res = await apiGetClassList(queryParams);
    if (queryParams.type) 
        res = await apiGetHistoryList(queryParams);
    
    // 追加数据
    classList.value = [...classList.value, ...res.data.data];
    
    // 判断是否没有更多数据
    if (queryParams.pageSize > res.data.data.length) 
        noData.value = true;
    
    // 缓存列表数据
    uni.setStorageSync("storgClassList", classList.value);
}

// 页面卸载时清除缓存
onUnload(() => {
    uni.removeStorageSync("storgClassList")
})
```

### 4. 预览页面

**功能描述**：大图预览，支持上下滑动切换壁纸。

**页面路径**：`/pages/preview/preview`

#### 核心代码

```javascript
// 加载壁纸
onLoad(async (e) => {
    currentId.value = e.id;
    
    // 分享进入的处理
    if (e.type == 'share') {
        let res = await apiDetailWall({ id: currentId.value });
        classList.value = res.data.map(item => {
            return {
                ...item,
                picurl: item.smallPicurl.replace("_small.webp", ".jpg")
            }
        })
    }
    
    // 获取当前索引
    currentIndex.value = classList.value.findIndex(
        item => item._id == currentId.value
    );
    currentInfo.value = classList.value[currentIndex.value];
    readImgsFun();
})

// 计算前后壁纸索引（实现无限滑动）
function readImgsFun() {
    readImgs.value.push(
        currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,  // 前一张
        currentIndex.value,                                                               // 当前张
        currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1    // 后一张
    )
    readImgs.value = [...new Set(readImgs.value)];  // 去重
}
```

### 5. 个人中心

**功能描述**：用户信息展示、收藏管理、历史记录等。

**页面路径**：`/pages/personal/personal`

### 6. 搜索页面

**功能描述**：支持壁纸关键词搜索，展示搜索结果。

**页面路径**：`/pages/search/search`

#### 使用的组件

- **uni-search-bar**：搜索输入框组件
  - [官方文档](https://uniapp.dcloud.net.cn/component/uniui/uni-search-bar.html)

- **uv-empty**：空状态组件
  - [插件市场](https://ext.dcloud.net.cn/plugin?id=12313)

#### 核心代码

```javascript
const searchData = async () => {
    try {
        let res = await apiSearchData(queryParams.value);
        classList.value = [...classList.value, ...res.data.data];
        
        // 缓存搜索结果
        uni.setStorageSync("storgClassList", classList.value);
        
        // 判断是否没有更多数据
        if (queryParams.value.pageSize > res.data.data.length) 
            noData.value = true;
        
        // 判断是否无搜索结果
        if (res.data.data.length == 0 && classList.value.length == 0) 
            noSearch.value = true;
            
    } finally {
        uni.hideLoading()
    }
}
```

## 🗺️ 页面路由配置（pages.json）

```json
{
    "pages": [
        {
            "path": "pages/index/index",
            "style": { "navigationBarTitleText": "推荐" }
        },
        {
            "path": "pages/classify/classify",
            "style": { "navigationBarTitleText": "分类" }
        },
        {
            "path": "pages/classlist/classlist",
            "style": { "navigationBarTitleText": "分类列表" }
        },
        {
            "path": "pages/preview/preview",
            "style": { "navigationBarTitleText": "壁纸预览" }
        },
        {
            "path": "pages/personal/personal",
            "style": { "navigationBarTitleText": "我的" }
        },
        {
            "path": "pages/search/search",
            "style": { "navigationBarTitleText": "搜索" }
        }
    ],
    "tabBar": {
        "list": [
            {
                "pagePath": "pages/index/index",
                "text": "推荐",
                "iconPath": "static/tabbar/recommend.png",
                "selectedIconPath": "static/tabbar/recommend-active.png"
            },
            {
                "pagePath": "pages/classify/classify",
                "text": "分类",
                "iconPath": "static/tabbar/category.png",
                "selectedIconPath": "static/tabbar/category-active.png"
            },
            {
                "pagePath": "pages/personal/personal",
                "text": "我的",
                "iconPath": "static/tabbar/mine.png",
                "selectedIconPath": "static/tabbar/mine-active.png"
            }
        ]
    }
}
```

## 🎯 核心功能特点

| 功能 | 说明 | 实现方式 |
|------|------|----------|
| **毛玻璃效果** | 卡片遮罩层模糊效果 | `backdrop-filter: blur(10rpx)` |
| **无限滑动预览** | 壁纸预览支持循环切换 | 计算前后索引实现 |
| **时间格式化** | 显示相对时间（几分钟前、几小时前） | `compareTimestamp` 函数 |
| **数据缓存** | 列表数据本地缓存 | `uni.setStorageSync` |
| **错误处理** | API 请求错误统一处理 | 封装 request 函数 |
| **分享进入** | 支持分享链接进入详情 | `onLoad` 判断 type 参数 |

## 📦 API 接口列表

| 接口名称 | 说明 | 参数 |
|----------|------|------|
| `apiGetClassList` | 获取分类列表 | classid, pageSize |
| `apiGetHistoryList` | 获取历史记录 | type, pageSize |
| `apiDetailWall` | 获取壁纸详情 | id |
| `apiSearchData` | 搜索壁纸 | keyword, pageSize |

## ⚠️ 注意事项

1. **API 密钥**：请求头中需要携带 `access-key: 20050920`
2. **图片格式**：预览页面需要将 `_small.webp` 替换为 `.jpg`
3. **缓存清理**：页面卸载时需要清除对应的缓存数据
4. **毛玻璃兼容**：`backdrop-filter` 在某些低版本安卓可能不兼容

## 🚀 后续优化建议

- [ ] 添加壁纸下载功能
- [ ] 添加用户登录/注册
- [ ] 实现收藏/点赞功能
- [ ] 添加壁纸分享功能
- [ ] 优化图片懒加载
- [ ] 添加骨架屏加载效果

## 👨‍💻 作者

- **GitHub**: [@y1733133864](https://github.com/y1733133864)

---

**一款功能完善的壁纸小程序，开启你的视觉盛宴** 🖼️✨

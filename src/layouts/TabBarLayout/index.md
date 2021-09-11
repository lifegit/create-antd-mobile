## TabBarLayout

配置式 标签栏布局。

#### 何时使用

通常用在路由中当作标签布局使用：
``` 
// 路由
// !#! 请在图片文件夹 @/assets/tarbar/${iconDir}/${iconName} 放置 icon svg 图片
{
  path: '/user',
  component: '../layouts/TabBarLayout',
  iconDir: 'user',
  routes: [
    { path: '/user', redirect: '/user/home' },
    {
      path: '/user/home',
      title: '首页',
      component: './User/Home',
      iconName: 'home',
    },
    {
      path: '/user/personal',
      title: '个人中心',
      component: './User/Personal',
      iconName: 'user',
    },
  ],
}
```

#### 代码演示

```tsx
import React from 'react';
import TabBarLayout from './index'

const route = {
  path: '/user',
  component: '../layouts/TabBarLayout',
  iconDir: 'user',
  routes: [
  { path: '/user', redirect: '/user/home' },
  {
    path: '/user/home',
    title: '首页',
    component: './User/Home',
    iconName: 'home',
  },
  {
    path: '/user/personal',
    title: '个人中心',
    component: './User/Personal',
    iconName: 'user',
  },
],
}

export default () => <TabBarLayout route={route} />
```

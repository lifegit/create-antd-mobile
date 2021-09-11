## BasicLayout

这是一个很基础的布局，包含了 一个进度条 和 进出场过渡动画。

#### 何时使用

通常用在路由中当作基础布局使用：
``` 
// routes
{
  path: '/',
  component: '../layouts/BasicLayout',
  routes: [
    { path: '/', redirect: '/home' },
    ...
  ]
}
```

#### 代码演示

```tsx
import React from 'react';
import BasicLayout from './index'

export default () => <BasicLayout>hello</BasicLayout>;
```

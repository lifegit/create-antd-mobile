---
order: 0
group:
  path: /components
---

## CarouselSimpleTemplate

广告组件中的模版，需要其他模版请再添加


### ImageTemp

图片模版

#### API
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| src     | 图片地址           | string  |  -    |
| tip     | 提示           | boolean ｜ undefined   |  true    |
| href     | 跳转的外链           | string ｜ undefined  |   undefined   |

#### 代码演示

```tsx
import React from 'react';
import { ImageTemp } from './index'

export default () => 
  <ImageTemp href='https://www.baidu.com/' src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3681880960,455182084&fm=26&gp=0.jpg' />
```



### Skip

跳转模版，会自动处理外部或内部链接

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| href     | 跳转地址           | string  |  string ｜ undefined    | undefined

#### 代码演示

```tsx
import React from 'react';
import { Skip } from './index';

export default () =>
  <div>
    <Skip href='https://www.baidu.com/' >外部链接</Skip>
    <Skip href='/' >内部链接</Skip>
  </div>
```

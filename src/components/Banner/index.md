---
order: 0
---

## Banner

简单的广告组件

### param

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| items     | 广告模版           | React.ReactNode[]  |      |

### 代码演示

```tsx
import React from 'react';
import CarouselSimple from './index'
import { ImageTemp } from './Template'

export default () => (
  <div>
    <CarouselSimple
      items={[
        <ImageTemp href='https://www.baidu.com/'
                   src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3681880960,455182084&fm=26&gp=0.jpg' />,
        <video src="https://www.w3school.com.cn/i/movie.mp4" controls="controls" />,
      ]}
    />
  </div>
)
```

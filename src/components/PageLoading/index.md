## PageLoading

#### 何时使用

页面初始化加载的时候可使用此组件

### API

| 参数            | 说明                               | 类型                         | 默认值 |
| --------------- | ---------------------------------- | ---------------------------- | ------ |
| icon           | 图标                         | `React.ReactNode`                    |   `<ActivityIndicator animating size="large" />`  |
| text           | 内容                          | `React.ReactNode ｜ string`          | 加载中...   |


#### 代码演示

```tsx
import React from 'react';
import PageLoading from './index';

export default () => <PageLoading />;
```

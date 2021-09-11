## PageContainer

### 介绍

1. 该组件实现了固定在顶部的导航栏，且自动维护返回键和标题，当然你也可以自己配置。
2. 该组件内部封装了 `NavBar` 支持所有属性。具体 API 请看 [NavBar](https://mobile.ant.design/components/nav-bar-cn/#components-nav-bar-demo-basic)

### 何时使用

如果你的功能需要把导航栏固定在顶部，那么你就可以使用此组件。例：大多数表单页面。

### param

| 参数            | 说明                       | 类型                                          | 默认值 |
|----------------|---------------------------|-----------------------------------------------|-------|
| title          | 标题                       |  string ｜ React.ReactNode ｜ undefined        | `props.title ?? route.title ?? document.title` |
| navBarProps    | NavBar 参数                | NavBarProps  ｜ undefined                      | -    |


#### ⚠️ 注意 ⚠️
你如果想使用自动 title 功能(route.title)，需要在 App.tsx 中使用 `RouteContext.Provider`：
```tsx | pure
// https://umijs.org/zh-CN/docs/runtime-config#rootcontainerlastrootcontainer-args
import RouteContext from './RouteContext'
export function rootContainer(children: React.ReactNode, args: any) {
  return (
    <RouteContext.Provider value={args}>
      {children}
    </RouteContext.Provider>
  );
}
```


### 代码演示

```tsx
import React from 'react';
import PageContainer from './index'
import { Icon } from 'antd-mobile';

export default () => (
  <PageContainer
    navBarProps={{
      rightContent: [
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]
    }}
  >
    { Array.from({length: 100}).map((item,index) => <div key={index}>{index}</div>) }
  </PageContainer>
)
```

## SimpleListView

### 介绍

1. 基于`ListView`封装的长列表组件, 上拉加载，下拉刷新，异步请求。同时支持 SSR 环境下使用。
2. 内部封装 [ListView](https://mobile.ant.design/components/list-view-cn/#components-list-view-demo-basic) 、[PullToRefresh](https://mobile.ant.design/components/pull-to-refresh-cn/)

### 何时使用

1. 适用于显示同类的长列表数据类型，对渲染性能有一定的优化效果。
2. 你只需要创建一个异步的请求给`request`, 同时在`renderRow`设置渲染的行,剩下的工作你完全不用操心,组件内部会帮你完成。


### param

| 参数              | 说明                       | 类型                                          | 默认值 |
|------------------|---------------------------|-----------------------------------------------|-------|
| request          | 获取数据的异步请求方法        |  (params: {pageSize: number,current: number}) => Promise<SimpleListViewResponse<T>> | - |
| renderRow        | 每行渲染函数                | (item: T, index: number, rowData: T[]) => React.ReactElement | -  |
| emptyWidget      | 无数据展示                  | React.ReactNode ｜ undefined                                 | `<DefaultEmptyWidget />`  |
| errorWidget      | 错误展示                   | React.ReactNode ｜ undefined                      | `<DefaultErrorWidget />`   |
| renderSeparator  | 分割线渲染函数              | (item: T, index: number) => React.ReactElement | `<DefaultSeparator />`  |
| skeletonLen      | 骨架屏数量                 | number ｜ undefined  | 10
| skeleton         | 骨架屏展示                 | React.ReactElement ｜ undefined  | `<DefaultSkeleton />`
| neverScroll      | 禁止滑动（开启后只能加载数据，一般用在页面里局部的listview，同时再给组件一个高度） | boolean ｜ undefined  | false
| style            | 组件行内样式 | React.CSSProperties ｜ undefined  | undefined
| className        | 组件样式 | string ｜ undefined  | undefined

### 代码演示

###### 全屏列表
```tsx
import React, { useRef, useState } from 'react';
import { SearchBar, Card } from 'antd-mobile';
import SimpleListView, { SimpleListViewRef, SimpleListViewResponse } from '@/components/SimpleListView';
import PageContainer from '@/components/PageContainer';


interface ListItem{
  id: string
  name: string
}

export default function IndexPage() {
  const [search, setSearch] = useState('');
  const ref = useRef<SimpleListViewRef>(null);

  const loadList = (params: {pageSize: number,current: number}) => {
    console.log(params, search)
    // 模拟请求
    return new Promise<SimpleListViewResponse<ListItem>>((resolve) => {
      setTimeout(()=>{
        const data = Array.from({length: 10}).map((item,key) => ({id: `${new Date().getTime()}-${key}`,name: `${key} ${search}`}))
        resolve({
          data,
          total: 30,
          pageSize: 10,
        })
      },2000 )
    })
  };

  const handleSeparator = (data: ListItem) =>
    <div key={data.id} style={{height:8, background: '#F1F1F1'}} />

  return (
    <PageContainer>
      <SearchBar placeholder="Search" onChange={setSearch} onSubmit={(s)=>ref.current?.reset()}/>
      <SimpleListView<ListItem>
        ref={ref}
        request={loadList}
        renderSeparator={handleSeparator}
        renderRow={(item: ListItem, index: number)=>(
          <Card full key={item.id}>
            <Card.Header
              title={item.name}
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            />
            <Card.Body>
              {`第${index}个`}
            </Card.Body>
          </Card>
        )}
      />
    </PageContainer>
  );
}
```

##### 固定高度
```tsx
import React from 'react';
import { Card } from 'antd-mobile';
import SimpleListView,{SimpleListViewResponse}  from '@/components/SimpleListView';
import PageContainer from '@/components/PageContainer';

interface ListItem{
  id: string
  name: string
}

export default function IndexPage() {
  const loadList = (params: {pageSize: number,current: number}) => {
    console.log(params)
    // 模拟请求
    return new Promise<SimpleListViewResponse<ListItem>>((resolve) => {
      setTimeout(()=>{
        const data = Array.from({length: 10}).map((item,key) => ({id: `${new Date().getTime()}-${key}`,name: `张${key}`}))
        resolve({
          data,
          total: 30,
          pageSize: 10,
        })
      },2000 )
    })
  };

  const handleSeparator = (data: ListItem) =>
    <div key={data.id} style={{height:8, background: '#F1F1F1'}} />

  return (
    <PageContainer>
      <SimpleListView<ListItem>
        style={{ height:200 }}
        request={loadList}
        renderSeparator={handleSeparator}
        renderRow={(item: ListItem, index: number)=>(
          <Card full key={item.id}>
            <Card.Header
              title={item.name}
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            />
            <Card.Body>
              {`第${index}个`}
            </Card.Body>
          </Card>
        )}
      />
    </PageContainer>
  );
}

```



##### 禁止滑动
```tsx
import React from 'react';
import { Card } from 'antd-mobile';
import SimpleListView,{SimpleListViewResponse}  from '@/components/SimpleListView';
import PageContainer from '@/components/PageContainer';

interface ListItem{
  id: string
  name: string
}

export default function IndexPage() {
  const loadList = (params: {pageSize: number,current: number}) => {
    console.log(params)
    // 模拟请求
    return new Promise<SimpleListViewResponse<ListItem>>((resolve) => {
      setTimeout(()=>{
        const data = Array.from({length: 10}).map((item,key) => ({id: `${new Date().getTime()}-${key}`,name: `张${key}`}))
        resolve({
          data,
          total: 30,
          pageSize: 10,
        })
      },2000 )
    })
  };

  const handleSeparator = (data: ListItem) =>
    <div key={data.id} style={{height:8, background: '#F1F1F1'}} />

  return (
    <PageContainer>
      <SimpleListView<ListItem>
        style={{ height:200 }}
        neverScroll={true}
        request={loadList}
        renderSeparator={handleSeparator}
        renderRow={(item: ListItem, index: number)=>(
          <Card full key={item.id}>
            <Card.Header
              title={item.name}
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            />
            <Card.Body>
              {`第${index}个`}
            </Card.Body>
          </Card>
        )}
      />
    </PageContainer>
  );
}

```

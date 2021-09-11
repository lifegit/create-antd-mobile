import React, { ReactElement, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { DefaultEmptyWidget, DefaultErrorWidget, DefaultSeparator, DefaultSkeleton } from './default';
import { ListViewProps } from 'antd-mobile/lib/list-view';
import { Icon, ListView, PullToRefresh } from 'antd-mobile';
import styles from './index.less';

export interface SimpleListViewRef {
  reset: () => void;
}

export enum SimpleListViewLoading {
  loading,
  success,
  error
}

export interface SimpleListViewResponse<T>{
  data: Array<T>
  total: number
  pageSize: number
}

export interface SimpleListViewProps<T>{
  /** 请求方法 */
  request: (params: {pageSize: number,current: number}) => Promise<SimpleListViewResponse<T>>;
  /** 每行渲染函数 */
  renderRow: (item: T, index: number, rowData: T[]) => React.ReactElement;
  /** 无数据展示 */
  emptyWidget?: React.ReactNode
  /** 错误展示 */
  errorWidget?: React.ReactNode
  /** 分割线渲染函数 */
  renderSeparator?: (item: T, index: number) => React.ReactElement
  /** 骨架屏数量 */
  skeletonLen?:number;
  /** 骨架屏展示 */
  skeleton?: React.ReactElement;
  /** 禁止滑动（开启后只能加载数据，一般用在页面里局部的listview） */
  neverScroll?: boolean;
  /** 行内样式 */
  style?: React.CSSProperties;
  /** className */
  className?: string;
}


const SimpleListView = <T extends any>(props: SimpleListViewProps<T>, ref: Ref<SimpleListViewRef>) => {
  const [first, setFirst] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [loadNoData, setLoadNoData] = useState(true);
  const [statues, setStatues] = useState(SimpleListViewLoading.loading);
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [defaultHeight, setDefaultHeight] = useState('100vh');

  // init
  useEffect(() => {
    handleRequest(1)
  }, []);

  // ref
  useImperativeHandle(ref, () => ({
    reset: () => handleRequest(1)
  }));


  // 请求
  const handleRequest = (page: number)=>{
    if (page !== 1 && (statues === SimpleListViewLoading.loading || loadNoData)){
      return;
    }
    // 设置页
    setPage(page)
    // 设置状态
    setStatues(SimpleListViewLoading.loading)
    // 发起请求
    props.request({pageSize, current: page}).then(res => {
      // 第一次
      if (first) setFirst(false)
      // 最后一页
      setLoadNoData(page === Math.ceil(res.total / res.pageSize))
      // 设置数据
      setDataSource(page === 1 ? res.data : dataSource.concat(res.data))
      // 设置页大小
      setPageSize(res.pageSize)
      // 设置状态
      setStatues(SimpleListViewLoading.success)
    }).catch(err => {
      setStatues(SimpleListViewLoading.error)
      setLoadNoData(false)
    })
  }
  // 数据缓存
  const dataSourceCache = new ListView.DataSource({
    rowHasChanged: (row1: any, row2: any) => row1 !== row2,
  });
  // 上拉组件
  const pullToRefreshNode =
    // @ts-ignore
    <PullToRefresh
      indicator={{
        release: <div style={{ position: 'relative', top:-10 }}>
          <Icon type='loading' />
          <span style={{ verticalAlign: 5,marginLeft: 10 }}>加载中...</span>
        </div>,
      }}
      distanceToRefresh={45}
      onRefresh={()=>handleRequest(1)}
      refreshing={page === 1 && statues === SimpleListViewLoading.loading}
    />
  // 下划线
  const renderSeparator = (_: any, rowID: any)=>
    props.renderSeparator ? props.renderSeparator(dataSource[rowID], Number(rowID)) : <DefaultSeparator key={rowID} />
  // 每一行
  const renderRow = (rowData:T[], _: any, rowID: any) =>
    props.renderRow(dataSource[Number(rowID)], Number(rowID), rowData)
  // TListView
  const TListView = (p?: Partial<ListViewProps>)=>
    <ListView
      // useBodyScroll
      renderRow={renderRow}
      style={{ height: defaultHeight, ...props?.style, }}
      renderSeparator={renderSeparator}
      className={`${styles.listView} ${p?.className}`}
      dataSource={dataSourceCache.cloneWithRows(dataSource)}
      {...p}
    />

  return (
    <div style={{ height: props?.style?.height ?? defaultHeight }}
         ref={(r)=>{
           const rect = r?.getBoundingClientRect()
           setDefaultHeight(`calc(100vh - ${rect?.top || 0}px)`)
         }}
    >
      {
        statues === SimpleListViewLoading.error ? (
          props.errorWidget ?? <DefaultErrorWidget />
        ) : statues === SimpleListViewLoading.success && !dataSource.length ? (
          props.emptyWidget ?? <DefaultEmptyWidget />
        ): first ? (
          Array.from({length: props.skeletonLen ?? 10}).map((item, index) => props.skeleton ?? <DefaultSkeleton key={index} />)
        ): props.neverScroll ? (
          <TListView />
        ):(
          // 这里需要使用函数渲染，使用JSX会导致pullToRefresh失效
          TListView({
            pageSize,
            scrollRenderAheadDistance: 500,
            pullToRefresh: pullToRefreshNode,
            onEndReachedThreshold: 50,
            onEndReached:()=>handleRequest(page + 1),
            renderFooter:()=>
              <div className={styles.renderFooter}>
                { statues === SimpleListViewLoading.loading ? (
                  <span>
                    <Icon type={'loading'} />
                    <span className={styles.text}>加载中...</span>
                  </span>
                ) : ( loadNoData ? '已全部加载' : '加载更多' )}
              </div>
          })
        )
      }
    </div>
  )
}

export default React.forwardRef(SimpleListView) as
<T extends any>(p: SimpleListViewProps<T> & { ref?: Ref<SimpleListViewRef> }) => ReactElement;

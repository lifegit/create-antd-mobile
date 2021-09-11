# AppContext

#### 介绍
1. 一个借助 react hooks (createContext、useContext、useEffect、useState) 实现的状态管理组件。redux 等的替代品。
2. 上述几个 hooks 介绍：[React Hook 中 createContext & useContext 跨组件透传上下文与性能优化](http://www.ptbird.cn/react-createContex-useContext.html)
2. 设计思想：[umi plugin-initial-state](https://umijs.org/plugins/plugin-initial-state#getinitialstate)  同样的使用方法。
3. 脱离业务，具有多项目移植性。（只在外层配置接口类型即可）。

#### demo
```ts
  + state.ts:   // 配置与业务相关的接口类型
    export interface Account{
      name: string;
      age: number;
    }

    export async function getInitialState(): Promise<{
      account?: Account
    }> {
      const account = await fetch() // 从网络获取
      return {
        account
      };
    }

  + App.ts: // 跟节点组件
    <AppContextProvider>
      { children }
    </AppContextProvider>


  + components: // 组件内使用
    const { initialState, setInitialState, error, loading, refresh } = useAppContext()
    const { account = {}} = initialState

    const handClick = ()=> {
      setInitialState({
        account: { ...account, age: 18 }
      })
    }

    return (
      <Button onClick={handClick}>{account.name}:{account.age}</Button>
    )
    
    //   OR useMemo：对于子组件提升性能较好，建议在复杂组件中这样用
    //   return useMemo(() => {
    //     console.log('[Child] RE-RENDER');
    //     return (
    //       <Button onClick={handClick}>{account.name}:{account.age}</Button>
    //     )
    //   }, [state.name, state.age]);
```


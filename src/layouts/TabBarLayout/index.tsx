import React, { useState } from 'react';
import { TabBar, Popover, Icon } from 'antd-mobile';
import { useLocation, history } from 'umi';
import styles from './index.less';

interface Options {
  route: {
    iconDir: string
    routes: RouterPage[]
  }
}

interface RouterPage {
  iconName: string
  title: string
  path: string
}

const Index: React.FC<Options> = (props) => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);

  const SvgIcon = ({ico}: any) => {
    try{
      return <div style={{
        width: '22px',
        height: '22px',
        background: `url(${require(`@/assets/tarbar/${props.route.iconDir}/${ico}.svg`)}) center center /  21px 21px no-repeat`,
      }}
      />
    }catch (e) {}

    return <Icon type="loading" size='xs' />
  }
  const TabBarItem = (data:RouterPage) => (
    <TabBar.Item
      // style={{maxHeight:document.documentElement.clientHeight - 100}}
      title={data.title}
      key={`tab-bar-item-${data.path}`}
      icon={<SvgIcon ico={`${data.iconName || data.title}-un`} />}
      selectedIcon={<SvgIcon ico={data.iconName || data.title} />}
      selected={location.pathname.startsWith(data.path)}
      badge={0}
      onPress={() => {
        history.push(data.path);
      }}
      data-seed="logId"
    >
      {props.children}
      {/* <Authorized authority={routerConfig} noMatch={<Exception403/>}> {children} </Authorized> */}
    </TabBar.Item>
  )

  const getChildrenContent = () => {
    // 获取 路由配置中带有 NAME 属性的路由信息
    const tabBarItems: RouterPage[] = props.route.routes.filter(item => item.title)
    let tabBarItem = [];
    // 判断数量
    if (tabBarItems.length < 5) {
      tabBarItem = tabBarItems.map((data) => TabBarItem(data) );
    }else {
      const moreCount = 4
      tabBarItem = tabBarItems.slice(0, moreCount).map(data => TabBarItem(data))
      const popoverItem = tabBarItems.slice(moreCount, tabBarItems.length).map(item => (
        <Popover.Item
          // style={{maxHeight:document.documentElement.clientHeight - 100}}
          key={`popover-item-${item.path}`}
          // @ts-ignore
          value={item.title}
          icon={<SvgIcon ico={`${item.iconName || item.title}-un`} />}
        >{item.title}
        </Popover.Item>
      ))
      tabBarItem.push(
        <TabBar.Item
          // style={{maxHeight:document.documentElement.clientHeight - 100}}
          title='更多'
          key="tab-bar-item-more"
          icon={<Icon style={{ width: '22px', height: '22px' }} type='ellipsis' />}
          selectedIcon={<div style={{ width: '22px', height: '22px', color: '#1890ff' }} />}
          selected={location.pathname === 'more'}
          badge={0}
          onPress={() => {
            setVisible(true);
          }}
        >
          <Popover
            mask
            visible={visible}
            overlay={popoverItem}
            placement='topRight'
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              // @ts-ignore
              offset: [-10, 0],
            }}
            onVisibleChange={setVisible}
            onSelect={() => setVisible(false)}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>
        </TabBar.Item>,
      );
    }

    return (
      <div style={{ position: 'fixed', height: '100%', maxWidth: '540px',width:'100%', top: 0, margin:'0 auto' }}>
        <TabBar
          prerenderingSiblingsNumber={0}
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition='bottom'
        >
          {tabBarItem}
        </TabBar>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {getChildrenContent()}
      </div>
    </div>
  )
}
export default Index

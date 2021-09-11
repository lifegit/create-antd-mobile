import React, { useContext } from 'react';
import styles from './index.less';
import { Icon, NavBar } from 'antd-mobile';
import { useHistory, useRouteMatch } from 'umi';
import { NavBarProps } from 'antd-mobile/lib/nav-bar/PropsType';
import routeContext, { findRouter } from './RouteContext';

interface Options{
  title?: string
  navBarProps?: NavBarProps
}

const Index: React.FC<Options> = (props) => {
  const history = useHistory()
  const route = useRouteMatch()
  const context = useContext(routeContext);
  const title = props.title ?? findRouter(route.path, context.routes ?? [])?.title ?? document?.title
  const isNotHome = context.routes? !context.routes?.find(item => item.path == route.path) && history.length > 2 : history.length > 2

  return (
    <div className={styles.PageWrapperContainer}>
      <NavBar
        mode="light"
        className={styles.navbar}
        icon={isNotHome && <Icon type="left" /> }
        onLeftClick={isNotHome ? history.goBack : undefined}
        {...props.navBarProps as React.Component<NavBarProps, any>}
      >
        {title}
      </NavBar>
      <div className={styles.bottomBox} />
      { props.children }
    </div>
  );
};
export default Index;

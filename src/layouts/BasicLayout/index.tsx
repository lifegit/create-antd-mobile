import React, { useState, useEffect } from 'react';
import NProgress from 'nprogress';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './nprogress.less';
import styles from './index.less';

const Index: React.FC = (props) => {
  useState(NProgress.start());

  useEffect(() => {
    NProgress.done();
    return () => NProgress.start();
  });

  return (
    <ReactCSSTransitionGroup
      transitionName="transitionWrapper"
      component="div"
      className={styles.transitionWrapper}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      <>
        {/* <Authorized authority={routerConfig} noMatch={<Exception403 />}> */}
        {props.children}
      </>
    </ReactCSSTransitionGroup>
  );
};

export default Index;

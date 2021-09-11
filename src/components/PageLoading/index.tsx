import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import styles from './index.less';

interface Options{
  icon?: React.ReactNode
  text?: React.ReactNode | string
}

const Index: React.FC<Options> = (props) => {
  const {
    text = '加载中...',
    icon = <ActivityIndicator animating size="large" />,
  } = props
  return (
    <div className={styles.pageLoadingContainer}>
      <div className={styles.subBox}>
        {icon}
        <span className={styles.loading}>{text}</span>
      </div>
    </div>
  )
}

export default Index

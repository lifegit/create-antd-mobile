import React from 'react';
import { Icon } from 'antd-mobile';
import PageContainer from '@/components/PageContainer';
import styles from './index.less';
import { Link } from '@umijs/preset-dumi/lib/theme';

const isDev = process.env.NODE_ENV === 'development';

const Index: React.FC = (props) => {
  return (
    <PageContainer
      navBarProps={{
        rightContent: [
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]
      }}
    >
      <div className={styles.center}>
        {
          isDev && (
            <div>
              <Link to="/umi/plugin/openapi" target="_blank">
                <div>OpenAPI 文档</div>
              </Link>
              <Link to="/~docs">
                <div>业务组件文档</div>
              </Link>
            </div>
          )
        }
        {Array.from({length: 100}).map((item,index) =>
          <div key={index}>{index}</div>
        )}
      </div>
    </PageContainer>
  );
}

export default Index

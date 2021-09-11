import React from 'react';
import { Result } from 'antd';
import { Button } from 'antd-mobile';
import { history } from 'umi';

const Index: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，你访问的页面不存在"
    extra={
      <Button style={{ width:'80%',margin:'0 auto' }} type="primary" onClick={() => history.replace('/')}>
        返回首页
      </Button>
    }
  />
);

export default Index;

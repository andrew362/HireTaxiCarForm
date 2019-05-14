import React from 'react';
import { Layout } from 'antd';
import Header from './Components/Header';
import ContentInner from './Components/Content';

const {
    Content,
  } = Layout;

const layout = () => {
 
    return (
    <Layout >
        <Header />
        <Content className='mainContent'>
          <ContentInner />
        </Content>
      </Layout>
    );
  
}

export default layout;
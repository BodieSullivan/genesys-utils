import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Talents from './Talents';
import { Layout } from 'antd';

const { Header, Footer, Content} = Layout;

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      <Header>Genesys Utilities</Header>
      <Content style={{ padding: '0 50px' }}>
        <Talents></Talents>
      </Content>
      <Footer></Footer>
    </Layout>
  )
}

export default App

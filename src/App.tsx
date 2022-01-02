import './App.css'
import Talents from './components/Talents/Talents';
import { Layout } from 'antd';
import logo from './triumph.svg';

const { Header, Footer, Content} = Layout;

function App() {
  return (
    <Layout>
      <Header><img src={logo} />Genesys Utilities</Header>
      <Content>
        <Talents></Talents>
      </Content>
      <Footer></Footer>
    </Layout>
  )
}

export default App

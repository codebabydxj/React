import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Icon, Layout, Badge} from 'antd';
import connect from '../../utils/connect';
import Storage from '../../utils/storage';
import SiderMenu from '../Sider/index';
import User from '../User/index';
import './App.scss';

const { Header, Footer, Content } = Layout;
class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInfo: {},
      collapsed: false,
    }
  }

  componentWillMount() {
    let storage = new Storage();
    let isLogin = storage.getSessionStorage('userInfo');
    if(!isLogin) {
      this.props.history.push('/login');
    } 
  }

  componentDidMount(){
    let storage = new Storage();
    let userInfo = storage.getSessionStorage('userInfo') ? JSON.parse(storage.getSessionStorage('userInfo')) : {};
    this.setState({
      userInfo
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { userInfo } = this.state;
    return (
      <div className="home_box">
        <Layout className="home_layout">
          <SiderMenu collapsed={this.state.collapsed} />
          <Layout>
            <Header className='home_header'>
              <Icon
                className="home_trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className="home_userInfo">
                <div className="home_message">
                  <Link to="./message" className='home_info'>
                      <Badge count={10} dot>
                        <Icon type="bell" style={{fontSize: '20px'}}/>
                      </Badge>
                  </Link>
                </div>
                <User userInfo={userInfo} history={this.props.history}/>
              </div>
            </Header>
            <Content className="home_content">
              {this.props.children} 
            </Content>
            <Footer className="home_footer">
              后台管理系统
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default connect(['user'])(App);

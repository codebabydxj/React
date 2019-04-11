import React, { Component } from 'react';
import { Menu, Avatar } from 'antd';
import { NavLink as Link } from 'react-router-dom';
import './User.scss';

const SubMenu = Menu.SubMenu;
class User extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        current: ''
    }
  }

  handleClick = (e) => {
    this.setState({
        current: e.key,
    });
  }

  outLogin = () => {
    window.sessionStorage.removeItem('userInfo');
    this.props.history.push('/login')
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div className='user_box'>
        <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
        >      
            <SubMenu title={<span><Avatar size="large" icon="user" src={''}/><span className='user_name'>{userInfo.username || '用户名'}</span></span>}>
                <Menu.Item key="1"><Link to="/personal">个人中心</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/system">设置中心</Link></Menu.Item>
                <Menu.Divider></Menu.Divider>
                <Menu.Item key="3" onClick={this.outLogin}>退出登录</Menu.Item>
            </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default User;
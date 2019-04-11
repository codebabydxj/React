import React, { Component } from 'react';
import { Menu, Icon, Layout} from 'antd';
import { NavLink as Link} from 'react-router-dom';
import './SiderMenu.scss';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const PandaSvg = () => (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z" fill="#6B676E" p-id="1143" />
        <path d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z" fill="#FFEBD2" p-id="1144" />
        <path d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z" fill="#E9D7C3" p-id="1145" />
        <path d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z" fill="#FFFFFF" p-id="1146" />
        <path d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z" fill="#6B676E" p-id="1147" />
        <path d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z" fill="#464655" p-id="1148" />
        <path d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655" p-id="1149" />
        <path d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655" p-id="1150" />
    </svg>
);
const PandaIcon = props => (
    <Icon component={PandaSvg} {...props} />
);
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'];
class HomeMenu extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openKeys: [],
        }
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    render() {
        return (
            <div style={{  width: !this.props.collapsed ? '256px' : '80px' }}> 
                <Menu 
                    theme="dark" 
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange} 
                    inlineCollapsed={this.props.collapsed}
                >
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="laptop" /><span>用户信息</span></span>}
                    >
                        <Menu.Item key="1"><Link to="">Tom</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="">Bill</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="">Alex</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="team" /><span>项目管理</span></span>}
                    >
                        <Menu.Item key="4"><Link to="">Team 1</Link></Menu.Item>
                        <Menu.Item key="5"><Link to="">Team 2</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={<span><Icon type="contacts" /><span>消息中心</span></span>}
                    >
                        <Menu.Item key="6"><Link to="">Message 1</Link></Menu.Item>
                        <Menu.Item key="7"><Link to="">Message 2</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={<span><Icon type="credit-card" /><span>管理中心</span></span>}
                    >
                        <Menu.Item key="8"><Link to="">Other 1</Link></Menu.Item>
                        <Menu.Item key="9"><Link to="">Other 2</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub5"
                        title={<span><Icon type="user" /><span>系统设置</span></span>}
                    >
                        <Menu.Item key="10"><Link to="">System 1</Link></Menu.Item>
                        <Menu.Item key="11"><Link to="">System 2</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
class SiderMenu extends Component {
  render() {
    const logoName = '后台管理系统';
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        width="256"
      >
        <div className='logo'>
            <PandaIcon className="home_icon" />
            <h3>{logoName}</h3>
        </div>
        <HomeMenu />
      </Sider>   
    )
  }
}

export default SiderMenu;

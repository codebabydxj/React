import React, { Component } from 'react';
import { Menu, Icon, Layout} from 'antd';
import { NavLink as Link} from 'react-router-dom';
import './SiderMenu.scss';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const PandaIcon = props => (
    <Icon type="ant-design" {...props}/>
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
            <h3><Link to='/'>{logoName}</Link></h3>
        </div>
        <HomeMenu />
      </Sider>   
    )
  }
}

export default SiderMenu;

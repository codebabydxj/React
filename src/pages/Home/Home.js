import React, { Component } from 'react';
import connect from '../../utils/connect';
class Home extends Component {
  render() {
    const user = window.sessionStorage.getItem('userInfo') ? JSON.parse(window.sessionStorage.getItem('userInfo')) : {};
    return (
      <div>
        登录成功！欢迎<span style={{color: '#3b99f0', padding: '0 3px'}}>{user.username}</span>回来，祝您生活愉快！
      </div>
    )
  }
}

export default connect()(Home);

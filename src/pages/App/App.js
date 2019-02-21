import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import connect from '../../utils/connect';
import Storage from '../../utils/storage';
import './App.scss';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInfo: {}
    }
  }

  componentWillMount() {
    let storage = new Storage();
    let isLogin = storage.getSessionStorage('userInfo');
    console.log(isLogin)
    if(!isLogin) {
      this.props.history.push('/login');
    } 
  }

  componentDidMount(){
    let storage = new Storage();
    let userInfo = storage.getLocalStorage('userInfo') ? JSON.parse(storage.getLocalStorage('userInfo')) : {};
    console.log(userInfo)
    this.setState({
      userInfo
    })
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default connect()(App);

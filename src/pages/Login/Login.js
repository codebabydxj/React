import React, { Component } from 'react';
import connect from '../../utils/connect';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }


  render() {
    return (
      <div>
          登录
      </div>
    )
  }
}

export default connect()(Login);

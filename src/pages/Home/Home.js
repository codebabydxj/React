import React, { Component } from 'react';
import connect from '../../utils/connect';
class Home extends Component {
  render() {
    return (
      <div>
        欢迎来到react世界！
      </div>
    )
  }
}

export default connect()(Home);

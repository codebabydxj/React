import React, { Component } from 'react';
import connect from '../../utils/connect';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import * as LoginActions from '../../../store/actions/login/login';
import { FetchAPI } from '../../utils/fetchApi';
import { loginUrl } from '../../utils/fetchUrl';
import './Login.scss';

class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // const userInfo = {
        //   username: values.userName,
        //   password: values.password
        // }
        // FetchAPI.getAPI(`${loginUrl}`,userInfo)
        // .then(res => {
        //   console.log(res)
        // })
        // .catch(err => {
        //   console.log(err)
        // })
        let data= {User:'yogi', Pass: '123456', ApiToken: '1t263rhfienfgjnrug82u84y489012u3ry873h'}
        this.props.dispatch(LoginActions.login(data))
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="normal-login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入您的用户名' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入您的密码' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = connect()(Form.create()(NormalLoginForm));

class Login extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {  
    return (
      <div>   
          <WrappedNormalLoginForm history={this.props.history}/>
      </div>
    )
  }
}
export default connect()(Login);

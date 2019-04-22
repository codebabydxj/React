import React,{Component} from 'react';
import { Router as BrowserRouter, Router as HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';
import { css } from 'glamor';
import { Spin } from 'antd';

const LOADING = css({
  width:250,height:30,
  textAlign: 'center',lineHeight:'30px',
  position: 'absolute',
  left:0,right:0,top:0,bottom:0,
  margin: 'auto'  
})
const history = createBrowserHistory();
const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div {...LOADING}><Spin size="large" /></div>;
    }
    // Handle the error state
    else if (error) {
        return <div {...LOADING}>Error:+{error}</div>;
    }
    else {
        return null;
    }
};

const App = Loadable({
    loader: () => import('../pages/App'),
    loading: MyLoadingComponent
});

const Login = Loadable({
    loader: () => import('../pages/Login'),
    loading: MyLoadingComponent
});

const Home = Loadable({
    loader: () => import('../pages/Home'),
    loading: MyLoadingComponent
});

const Message = Loadable({
    loader: () => import('../pages/Message'),
    loading: MyLoadingComponent
})

const Personal = Loadable({
    loader: () => import('../pages/Personal'),
    loading: MyLoadingComponent
})

const System = Loadable({
    loader: () => import('../pages/System'),
    loading: MyLoadingComponent
})

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/message',
        exact: false,
        component: Message
    },
    {
        path: '/personal',
        exact: true,
        component: Personal
    },
    {
        path: '/system',
        exact: true,
        component: System
    }
];
/** 
 * BrowserRouter: 开发过程中使用它控制路由，上传至服务器需要替换，否则会出现访问资源不存在错误
 * HashRouter: 上传至服务器使用它控制路由
 * */ 
let RouterCreate = process.env.NODE_ENV !== 'production' ? BrowserRouter : HashRouter;

class CreateRoutes extends Component{
    render() {
        return (
            <RouterCreate history={history}>
                <Switch>
                    <Route path='/login' component={Login} />
                    <App history={history}>
                        {
                            routes.map((route, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.component}
                                    />
                                )
                            })
                        }
                    </App>
                    {<Redirect exact to='/' from=''/>}
                </Switch>
            </RouterCreate>
        )
    }
}

export default CreateRoutes;

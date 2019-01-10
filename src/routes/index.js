import React,{Component} from 'react';
import { Router as BrowserRouter, Router as HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';
import { css } from 'glamor';

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
        return <div {...LOADING}>Loading...</div>;
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

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    }
];

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

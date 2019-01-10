import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer }  from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from "../store/store";
import './index.less';

const initStore = configureStore();
const MOUNT_NODE = document.getElementById('root');

let render = () => {
    const RouterCont = require('./routes/index').default;
    ReactDOM.render(
        <AppContainer>
            <Provider store={initStore}>
                <RouterCont />
            </Provider>
        </AppContainer>,
        MOUNT_NODE
    )
}

if(module.hot) {
    module.hot.accept('./routes/index', () => {
        setImmediate(() => {
            ReactDOM.unmountComponentAtNode(MOUNT_NODE);   //销毁 MOUNT_NODE 容器内部节点
            render();
        })
    })
}

render();
const FETCH_INDEX  = 0;
const FETCH_API = [
    "http://abc:9001/api/",  // 测试服
    "http://abcd:9001/api/"  // 正式服
];

const FETCH_API_IP = FETCH_API[FETCH_INDEX];

/*用户注册*/
export const registerUrl = FETCH_API_IP + '';

/*用户登录*/
export const loginUrl = FETCH_API_IP + '';

/*用户退出登录*/
export const outLoginUrl = FETCH_API_IP + '';
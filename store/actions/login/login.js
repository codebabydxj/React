const PREFIX = 'LOGIN/';
const LOGIN = `${PREFIX}LOGIN`; 
export const LOGIN_PENDING = `${LOGIN}_PENDING`;
export const LOGIN_REJECTED = `${LOGIN}_REJECTED`;
export const LOGIN_SUCCESS = `${LOGIN}_SUCCESS`;

export const login = (data) => {
    if(data === null) {
        return
    }
    return dispatch => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
    }
}
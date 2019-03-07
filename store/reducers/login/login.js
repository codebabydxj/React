import * as LoginActions from '../../actions/login/login';

const initialState = {
    isReady: false,
    data: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LoginActions.LOGIN_PENDING:
        return state;

        case LoginActions.LOGIN_SUCCESS:
        return {
            ...state,
            data: action.payload,
            isReady: true
        }

        default:
        return state
    }
}
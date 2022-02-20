import {
    authConstants
} from "../actions/constant"

const initState = {
    token: null,
    user: {
        name: '',
        username: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: "",
    address: [],
    orders: [],
    placedOrderId: null,
    orderDetails:[]
}
export default (state = initState, action) => {

    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                authenticate: false,
                authenticating: false
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true,

            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState,
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case authConstants.ADD_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.ADD_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false
            }
            break;
        case authConstants.ADD_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case authConstants.GET_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.GET_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false
            }
            break;
        case authConstants.GET_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case authConstants.ADD_ORDER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.ADD_ORDER_SUCCESS:
            state = {
                ...state,
                placedOrderId: action.payload.order._id,
                loading: false
            }
            break;
        case authConstants.ADD_ORDER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case authConstants.GET_ORDER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.GET_ORDER_SUCCESS:
            state = {
                ...state,
                orders: action.payload.order,
                loading: false
            }
            break;

        case authConstants.GET_ORDER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case authConstants.GET_ORDER_DETAILS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.GET_ORDER_DETAILS_SUCCESS:
            state = {
                ...state,
                orderDetails: action.payload.order,
                loading: false
            }
            break;
        case authConstants.GET_ORDER_DETAILS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
    }
    return state;
}
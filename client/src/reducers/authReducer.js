import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_USER_NAME,
  AUTH_ERROR,
  USER_ERROR,
  ACCOUNT_ERROR,
  EMAIL_ERROR,
  PASSWORD_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  DELETE_ACCOUNT,
  SET_LOADING,
  RESET_STATUS
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
  authError: null,
  userError: null,
  accountError: null,
  emailError: null,
  passError: null,
  emailUpdateStatus: null,
  accountDeleteStatus: null,
  passwordChangeStatus: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case UPDATE_PASSWORD:
      return {
        ...state,
        passError: null,
        passwordChangeStatus: 'success',
        loading: false
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        user: action.payload,
        emailError: null,
        emailUpdateStatus: 'success',
        loading: false
      }
    case UPDATE_USER_NAME : 
      return {
        ...state,
        user: action.payload,
        userError: null,
        loading: false
      }
    case DELETE_ACCOUNT: {
      return {
        ...state,
        accountDeleteStatus: 'success',
        loading: false
      }
    }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        authError: action.payload,
        accountError: null,
        emailError: null,
        passError: null,
        userError: null,
        emailUpdateStatus: null,
        accountDeleteStatus: null,
        passwordChangeStatus: null
      };
    case USER_ERROR:
      return {
        ...state,
        userError: action.payload,
        loading: false
      }
    case ACCOUNT_ERROR: 
      return {
        ...state,
        accountError: action.payload,
        accountDeleteStatus: 'failed',
        loading:false
      }
    case EMAIL_ERROR: 
      return {
        ...state,
        emailError: action.payload,
        emailUpdateStatus: 'failed',
        loading:false
      }
    case PASSWORD_ERROR: 
      return {
        ...state,
        passError: action.payload,
        passwordChangeStatus: 'failed',
        loading:false
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        authError: null,
        userError: null,
        accountError: null,
        emailError: null,
        passError: null,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case RESET_STATUS:
      switch(action.payload) {
        case 'email' :
          return {
            ...state,
            emailUpdateStatus: null
          }
        case 'account':
          return {
            ...state,
            accountDeleteStatus: null,
          }
        case 'password': 
          return {
            ...state,
            passwordChangeStatus: null
          }
        default:
          return {
            ...state
          }
      }
    default:
      return state;
  }
}
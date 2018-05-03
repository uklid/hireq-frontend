import { Map } from 'immutable'
import actions from './actions'

const checkIsLoggedIn = () => {
  const isSignin = localStorage.getItem('loginToken')
  console.log("isSingin = ",isSignin)
  if (isSignin) {
    return true
  }
  return false
}

// const initState = new Map({
//   idToken: null,
//   loading: false,
//   isLoggedIn: true,
//   authToken: '',
//   error_message: ''
// })

const initState = {
  idToken: null,
  loading: false,
  isLoggedIn: checkIsLoggedIn(),
  authToken: '',
  error_message: ''
}
// export default function authReducer(state = initState, action) {
//   switch (action.type) {
//     case actions.LOGIN_SUCCESS:
//       return state.set('idToken', action.token)
//     case actions.LOGOUT:
//       return initState
//     default:
//       return state
//   }
// }

const Auth = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        authToken: action.data
      }
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        authToken: ''
      }
    case 'LOGIN_FAIL':
      return {
        ...state,
        loading: false,
        errorMessage: action.data
      }
    default:
      return {
        ...state,
        loading: false
      }
  }
}

export default Auth
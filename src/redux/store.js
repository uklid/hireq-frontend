import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from '../redux/reducers'

const history = createHistory()
const routeMiddleware = routerMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(routeMiddleware, thunk))
)

export { store, history }

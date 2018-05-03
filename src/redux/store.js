import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import reducers from '../redux/reducers'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import rootSaga from '../redux/sagas'

const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const middlewares = [thunk, sagaMiddleware, routeMiddleware]
// const middlewares = [thunk,routeMiddleware]

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(routeMiddleware, thunk))
)
// const store = createStore(
//   persistCombineReducers({
//     key: 'root',
//     storage,
//     blacklist: ['loading', 'history'],
//   }, {
//       ...reducers,
//       router: routerMiddleware
//     }), composeEnhancers(applyMiddleware(routeMiddleware, thunk))
// )
// sagaMiddleware.run(rootSaga)
// const persistor = persistStore(store)
export { store, history }

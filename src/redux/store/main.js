import { connectRouter, routerMiddleware } from 'connected-react-router'
import { applyMiddleware, createStore, Store, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from '../reducers/index'
import { createBrowserHistory } from 'history'
import { rootSaga } from '../sagas/index'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, routerMiddleware(history)]

/* Add devtools for chrome only */
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const enhancer = compose(applyMiddleware(...middlewares), devTools)
const combine = combineReducers({ router: connectRouter(history), rootReducer })

export const store = createStore(combine, enhancer)
sagaMiddleware.run(rootSaga)

import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './index.css'

import AppContainer from './containers/AppContainer'

// Redux
import { Provider } from 'react-redux'

// Redux store
// import { createStore } from 'redux'
// import rootReducer from './reducers'
// const store = createStore(rootReducer)

import configureStore from './configureStore'
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

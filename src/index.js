import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk'; //export defaultだから{}をつけたらエラーになる
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { searchRobots, requestRobots } from './reducers';
import 'tachyons'; //便利なnpmパッケージ

const logger = createLogger(); //middleware
const rootReducer = combineReducers({searchRobots, requestRobots}); //reducerをまとめる
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>{/*propsとして親から子に毎回storeを渡す代わりにProviderはこれだけですべてのコンポネントにstoreを渡せる */}
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

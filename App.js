import React from 'react';
import 'react-native-gesture-handler';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AppNavigation from './src/navigation/AppNavigation';
import authReducer from './src/store/reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1}}>
      <AppNavigation></AppNavigation>
    </SafeAreaView>
    </Provider>
  );
}

export default App;

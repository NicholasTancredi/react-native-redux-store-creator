# react-native-redux-store-creator
import storeCreator from 'react-native-redux-store-creator'
import reducers from './reducers'

required arguments:
reducers uses the combineReducers method http://redux.js.org/docs/api/combineReducers.html

optional arguments:
persistStoreOptions from https://github.com/rt2zz/redux-persist
loggerOptions from https://github.com/evgenyrodionov/redux-logger
storage defaults to AsyncStorage from React Native

const store = storeCreator(
    reducers,
    persistStoreOptions,
    loggerOptions,
    storage
)

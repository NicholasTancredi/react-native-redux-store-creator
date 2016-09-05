# react-native-redux-store-creator
------
##### Required arguments:
The reducers argument is passed to the combineReducers method from redux http://redux.js.org/docs/api/combineReducers.html

##### Optional arguments:
persistStoreOptions from persistStore https://github.com/rt2zz/redux-persist

loggerOptions from https://github.com/evgenyrodionov/redux-logger

storage for persistStore defaults to AsyncStorage from React Native

------

## Basic Example:
```
import storeCreator from 'react-native-redux-store-creator'
import reducers from './reducers'

const store = storeCreator(reducers)
```

## Advanced Example:

```
import storeCreator from 'react-native-redux-store-creator'
import reducers from './reducers'

const store = storeCreator(reducers, {
    persistStore: {
        blacklist: ['someTransientReducer']
    },
    storage: localStorage,
    purgeKeys: ['reducerName'],
    purgeAll: true,
    logger: {
        collapsed: () => false
    },
})
```

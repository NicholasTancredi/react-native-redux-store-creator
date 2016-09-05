# react-native-redux-store-creator
------
### Required arguments:
The reducers argument is passed to the combineReducers method from redux http://redux.js.org/docs/api/combineReducers.html

### Optional arguments:
persistStore, purgeKeys, purgeAll are from persistStore https://github.com/rt2zz/redux-persist

**persistStore**: The options object passed to persistStore. *Defaults to an empty Object.*

**purgeKeys**: An array of keys to be purged from storage. *Defaults to an empty Array.*

**purgeAll**: Boolean value to purge all keys. *Defaults to false.*

logger is from https://github.com/evgenyrodionov/redux-logger


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
    purgeAll: true,
    logger: {
        collapsed: () => false
    },
})
```

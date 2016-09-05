import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose
} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {REHYDRATE} from 'redux-persist/constants'

import {AsyncStorage} from 'react-native'

import createActionBuffer from 'redux-action-buffer'
import {autoRehydrate, persistStore} from 'redux-persist'

export default (
	reducers, options = {
	persistStore: {},
    purgeKeys: [],
    purgeAll: false,
	logger: {},
}) => {
    if (process.env.NODE_ENV !== 'production') {
		if (!reducers || Object.keys(reducers).length === 0) {
			console.error(
				`createStore does not have a valid reducers object argument. Make sure the first argument passed to createStore is an object whose values are reducers.`
			)
		}
	}

    const {
        logger,
        purgeAll,
        purgeKeys,
        persistStore,
    } = options

	const store = createStore(
		combineReducers(reducers),
		undefined,
		compose(
			autoRehydrate(),
			applyMiddleware(thunk,
				createActionBuffer(REHYDRATE),
				createLogger({collapsed: () => true, ...logger}),
			)
		)
	)

    if (purgeAll) {
    	persistStore(store, {storage: AsyncStorage, ...persistStore}).purge()
    } else if (purgeKeys.length) {
        persistStore(store, {storage: AsyncStorage, ...persistStore}).purge(purgeKeys)
    } else {
    	persistStore(store, {storage: AsyncStorage, ...persistStore})
    }

	return store
}

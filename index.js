const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const compose = redux.compose

const thunk = require('redux-thunk').default
const createLogger = require('redux-logger')
const constants = require('redux-persist/constants')
const REHYDRATE = constants.REHYDRATE

const ReactNative = require('react-native')
const AsyncStorage = ReactNative.AsyncStorage

const createActionBuffer = require('redux-action-buffer')

const reduxPersist = require('redux-persist')
const persistStore = reduxPersist.persistStore
const autoRehydrate = reduxPersist.autoRehydrate

const storeCreator = (reducers, options) => {
    if (process.env.NODE_ENV !== 'production') {
		if (!reducers || Object.keys(reducers).length === 0) {
			console.error(
				`createStore does not have a valid reducers object argument. Make sure the first argument passed to createStore is an object whose values are reducers.`
			)
		}
	}

	options = Object.create({
		persistStore: {},
	    purgeKeys: [],
	    purgeAll: false,
		logger: {},
	}, options)

	const logger = options.logger
	const purgeAll = options.purgeAll
	const purgeKeys = options.purgeKeys
	const persistStoreOptions =  Object.create(
		{storage: AsyncStorage},
		options.persistStore
	)
	const loggerOptions = Object.create({collapsed: () => true}, logger)

	const store = createStore(
		combineReducers(reducers),
		undefined,
		compose(
			autoRehydrate(),
			applyMiddleware(thunk,
				createActionBuffer(REHYDRATE),
				createLogger(loggerOptions)
			)
		)
	)

    if (purgeAll) {
    	persistStore(store, persistStoreOptions).purge()
    } else if (purgeKeys.length) {
        persistStore(store, persistStoreOptions).purge(purgeKeys)
    } else {
    	persistStore(store, persistStoreOptions)
    }

	return store
}
console.log('test', storeCreator({
	test: (state, action) => {
		if (state === undefined) state = 'test'
	    switch (action.type) {
	        case 'UPDATE':
	            return action.payload
	        default:
	            return state
	    }
	}
}))
module.exports = storeCreator

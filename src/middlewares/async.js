export const asyncMiddleware = store => next => action => {

    if (typeof action === 'function') return action(store.dispatch)

    // console.log({store, next, action})
    next(action)
}
const initialFechting = {loading: 'idle', error: null}

export const reduceReducer = (...reducers) => (state, action) => {
    reducers.reduce((acc, el) => el(acc, action), state)
}

//high order reducer 
export const makeFetchingReducer = actions => (state = initialFechting, action) => {
    switch (action.type) {
        case action[0]: {
            return {...state, loading: 'pending'}
        }
        case actions[1]: {
            return {...state, loading: 'succeded'}
        }
        case actions[2]: {
            return {error: action.error, loading: 'rejected'}
        }
        default: return state
    }
}



export const makeSetReducer = actions => (state = 'all', action) => {
    switch(action.type) {
        case actions[0]: {
            return action.payload
        }
        default: return state
    }
}

export const makeCrudReducer =  actions => (state = [], action) => {
    switch (action.type) {
        case actions[0]: {
            return state.concat({...action.payload})
        }

        case actions[1]: {
            const newsEntities = state.map(entity => {
            if (entity.id === action.payload.id) {
                return {...entity, completed: !entity.completed}
            }
            return entity
            })
    
            return newsEntities
        }
        default: return state
    }   
}
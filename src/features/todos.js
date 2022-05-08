import { combineReducers } from "redux"
import { makeCrudReducer, makeFetchingReducer, makeSetReducer, reduceReducer } from "./utilities"

export const setPending = () => {
    return {
        type: 'todos/pending'
    }
}

export const setFilter = payload => ({type: 'filter/set', payload})
export const setCompleted = payload => ({ type: 'todo/complete', payload})
export const setFulfilled = payload => ({type: 'todos/fulfilled', payload})
export const setError = e => ({type: 'todos/error', payload: e.message})

export const fetchThunk = () => async dispatch => {
    dispatch(setPending())
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data = await response.json()
        // console.log(data)
        const todos = data.slice(0, 10)
        dispatch(setFulfilled(todos))
    }
    catch (e) {
        dispatch(setError(e))
    }
}

export const filterReducer = makeSetReducer(['filter/set']) 

export const fetchingReducer = makeFetchingReducer([
    'todos/pending', 'todos/fulfilled', 'todos/rejected'
])


const fulfilledReducer = makeSetReducer(['todos/fulfilled'])

const crudReducer = makeCrudReducer(['todo/add', 'todo/complete'])
export const todosReducer = reduceReducer(crudReducer, fulfilledReducer)

export const reducer = combineReducers({
    todos: combineReducers({
        entities: todosReducer,
        status: fetchingReducer
        }
    ),
    filter: filterReducer,
})


export const selectTodo = state => {
    const {todos: {entities}, filter} = state
  
    if (filter === 'complete') {
      return entities.filter(todo => todo.completed)
    }
  
    if (filter === 'incomplete') {
      return entities.filter(todo => !todo.completed)
    }
  
    return entities
  }
  
  export const selectStatus = state => state.todos.status
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  entities: [],
  filter: 'all' //completed, incompleted
}

export const reducer = (state = initialState, action) => {
  // console.log(state)
  switch (action.type) {
    case 'todo/add': {
      return {
        ...state,
        entities: state.entities.concat({...action.payload})
      }
    }
    case 'todo/complete': {
      const newsTodo = state.entities.map(todo => {
        if (todo.id === action.payload.id) {
          return {...todo, completed: !todo.completed}
        }
        return todo
      })

      return {
        ...state,
        entities: newsTodo
      }
    }
    case 'filter/set': {
      return {
        ...state,
        filter: action.payload
      }
    }
  }
  return state
}

const TodoItem = ({todo}) => {
  const dispatch = useDispatch()
  return <li 
    key={todo.id} 
    onClick={() => dispatch({ type: 'todo/complete', payload: todo})}
    style={{ textDecoration: todo.completed ? 'line-through': 'none' }}>
      {todo.title}
    </li>
}

const selectTodo = state => {
  const {entities, filter} = state

  if (filter === 'complete') {
    return entities.filter(todo => todo.completed)
  }

  if (filter === 'incomplete') {
    return entities.filter(todo => !todo.completed)
  }

  return entities
}

const App = () => {
  const [value, setvalue] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector(selectTodo)
  // console.log({state})
  
  const submit = e => {
    e.preventDefault()
    if (!value.trim()) {
      return
    }
    const id = Math.random().toString(36)
    const todo = {title: value, completed: false, id}
    dispatch({type: 'todo/add', payload: todo})
    setvalue('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input onChange={e => setvalue(e.target.value)}/>  
      </form> 
      <button onClick={() => dispatch({type: 'filter/set', payload: 'all'})}>Mostrar Todos</button>
      <button onClick={() => dispatch({type: 'filter/set', payload: 'complete'})}>Completados</button>
      <button onClick={() => dispatch({type: 'filter/set', payload: 'incomplete'})}>Incompletos</button>
      <ul>
        {todos.map(todo => <TodoItem todo={todo}/> )}
      </ul>
    </div>
  )
}

export default App
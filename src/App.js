import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setCompleted, setFilter, fetchThunk, selectTodo, selectStatus} from './features/todos'


const TodoItem = ({todo}) => {
  const dispatch = useDispatch()
  return <li 
    onClick={() => dispatch(setCompleted(todo))}
    style={{ textDecoration: todo.completed ? 'line-through': 'none' }}>
      {todo.title}
    </li>
}

const App = () => {
  const [value, setvalue] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector(selectTodo)
  const status = useSelector(selectStatus)
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

    if (status.loading === 'loading') {
        setInterval(5000)
        return <div>Cargando...</div>
    }

    if (status.loading === 'rejected') {
        setInterval(5000)
        return <div>Error...</div>
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input onChange={e => setvalue(e.target.value)}/>  
      </form> 
      <button onClick={() => dispatch(setFilter('all'))}>Mostrar Todos</button>
      <button onClick={() => dispatch(setFilter('complete'))}>Completados</button>
      <button onClick={() => dispatch(setFilter('incomplete'))}>Incompletos</button>
      <button onClick={() => dispatch(fetchThunk())}>Thunk</button>
      <ul>
        {todos.map(todo => <TodoItem todo={todo}/> )}
      </ul>
    </div>
  )
}


export default App
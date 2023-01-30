import TodoItem from './todoItem.jsx'
import { supabase } from '../supabase.js'
import Header from './header.jsx'
import React, { useState, useEffect, useRef } from 'react'

export default function List() {
  const [todos, setTodos] = useState([])
  const newTaskTextRef = useRef()
  const [errorText, setError] = useState('')

  useEffect(() => {
    fetchTodos().catch(console.error)
  }, [])

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: false })
    if (error) console.log('error', error)
    else setTodos(todos)
  }

  const addTodo = async () => {
    if (newTaskTextRef.current.value === '') {
      setError('Please enter a task')
      return
    }
    const text = newTaskTextRef.current.value
    newTaskTextRef.current.value = ''
    setError('')
    const { data: todo, error } = await supabase
      .from('todos')
      .insert([{ text }])
      .single()
    if (error) console.log('error', error)
    else {
      setTodos([todo, ...todos])
      setError(null)
      newTaskTextRef.current.value = ''
    }
  }

  const deleteTodo = async (id) => {
    try {
      await supabase.from('todos').delete().eq('id', id)
      setTodos(todos.filter((x) => x.id !== id))
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <Header addTodo={addTodo} newTaskTextRef={newTaskTextRef} />
      <div className="overflow-hidden bg-white py-2  sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {todos.length ? (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))
          ) : (
            <span className="text-5xl text-left font-bold tracking-tight text-indigo-600 sm:text-5xl lg:text-5xl">
              You do have any tasks yet!
            </span>
          )}
        </ul>
      </div>
    </>
  )
}

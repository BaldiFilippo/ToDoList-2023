import TodoItem from './todoItem.jsx'
import { supabase } from '../supabase.js'
import Header from './header.jsx'
import React, { useState, useEffect, useRef } from 'react'

export default function List() {
  const [todos, setTodos] = useState([])
  const newTaskTextRef = useRef()
  const [searchTaskTextRef, setSearchTaskTextRef] = useState('')
  const [errorText, setError] = useState('')

  useEffect(() => {
    fetchTodos().catch(console.error)
  }, [])

  const fetchTodos = async () => {
    if (searchTaskTextRef === '') {
      const { data: todos, error } = await supabase.from('todos').select('*')
      if (error) console.log('error', error)
      else setTodos(todos)
      return
    } else {
      let { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .ilike('text', `%${searchTaskTextRef}%`)
        .order('id', { ascending: false })

      if (error) console.log('error', error)
      else setTodos(todos)
    }
  }

  const addTodo = async () => {
    if (newTaskTextRef.current.value === '') {
      setError('Please enter a task')
      return
    }

    const text = newTaskTextRef.current.value
    newTaskTextRef.current.value = ''
    setError('')
    let { data: todo, error } = await supabase
      .from('todos')
      .insert([{ text }])
      .single()

    console.log(todo, 'todo aggiunta nel DB')
    if (error) {
      console.log('error', error)
    } else if (!todo) {
      console.log(todo, 'todo not found')
    } else {
      setTodos([todo, ...todos])
      setError(null)
      newTaskTextRef.current.value = ''
      console.log(todo, ' Lista aggiornata')
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

  const handleInputChange = (e) => {
    setSearchTaskTextRef(() => {
      return e.target.value
    })
    fetchTodos().catch(console.error)
  }

  return (
    <>
      <Header
        addTodo={addTodo}
        newTaskTextRef={newTaskTextRef}
        handleInputChange={handleInputChange}
      />
      <div className="overflow-hidden bg-white py-2  sm:rounded-md">
        <div role="list" className="divide-y divide-gray-200">
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
              You don't have any activities yet!
            </span>
          )}
        </div>
      </div>
    </>
  )
}

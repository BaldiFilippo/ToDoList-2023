import { useState } from 'react'
import { supabase } from '../supabase.js'

const select = ({ todo, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed)

  const toggleCompleted = async () => {
    const { data, error } = await supabase
      .from('todos')
      .update({ completed: !isCompleted })
      .eq('id', todo.id)
      .single()
    if (error) {
      console.error(error)
    }
    setIsCompleted(data.completed)
  }

  return (
    <div className={'p-3 max-h-14 flex align-center justify-between space-x-2'}>
      <span className={' flex-grow'}>
        <input
          className="h-4 w-4 rounded border-gray-300  text-indigo-600 focus:ring-indigo-500"
          onChange={toggleCompleted}
          type="checkbox"
          checked={isCompleted ? true : ''}
        />
        <span
          className={`w-full flex-grow ${isCompleted ? 'line-through' : ''}`}
        >
          {todo.task}
        </span>
      </span>
      <button
        className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onDelete(todo.id)
        }}
      >
        X
      </button>
    </div>
  )
}

export default select

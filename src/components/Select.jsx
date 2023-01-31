import { useState } from 'react'
import { supabase } from '../supabase.js'
import { TrashIcon } from '@heroicons/react/20/solid'

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
      <TrashIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 cursor-pointer hover:text-red-500"
        aria-hidden="true"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onDelete(todo.id)
        }}
      />
    </div>
  )
}

export default select

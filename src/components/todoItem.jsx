import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid'

import { useState } from 'react'

import Select from './select.jsx'

const todoItem = ({ todo, onDelete }) => {
  return (
    <div key={todo.id} todo={todo}>
      <div className="block hover:bg-gray-50 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="truncate text-md font-medium text-gray-900">
            {todo.text}
          </p>
          <div className="ml-2 flex flex-shrink-0">
            <Select todo={todo} onDelete={onDelete} />
          </div>
        </div>
        <div className="mt-2 sm:flex ">
          <div className="sm:flex"></div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <CalendarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <p>
              Created on <time>{todo.date}</time>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default todoItem

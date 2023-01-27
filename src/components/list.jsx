import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid'
import supabase from '../supabase'
import Select from './Select'

import React, { useState, useEffect } from 'react'

const todos = [
  {
    id: 1,
    title: 'Complete online JavaScript course',
    date: '2020-01-07',
    closeDate: '2020-01-07',
    completed: true,
  },
  {
    id: 2,
    title: 'Jog around the park 3x',
    date: '2020-01-07',
    closeDate: '2020-01-07',
    completed: false,
  },
  {
    id: 3,
    title: '10 minutes meditation',
    date: '2020-01-07',
    closeDate: '2020-01-07',
    completed: false,
  },
  {
    id: 4,
    title: 'Read for 1 hour',
    date: '2020-01-07',
    closeDate: '2020-01-07',
    completed: false,
  },
  {
    id: 5,
    title: 'Pick up groceries',
    date: '2020-01-07',
    closeDate: '2020-01-07',
    completed: false,
  },
  {
    id: 6,
    title: 'Complete Todo App on Frontend Mentor',
    date: '2020-01-07',
    closeDate: '2020-01-07',
    completed: false,
  },
]

export default function List() {
  async function fetchData() {
    let { data: tasks, error } = await supabase.from('todos').select('*')
    console.log(tasks)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {todos.map((todo) => (
          <li key={todo.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-md font-medium text-gray-900">
                    {todo.title}
                  </p>
                  <div className="ml-2 flex flex-shrink-0">
                    <Select />
                    {/* <p
                      className={
                        todo.completed
                          ? 'inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'
                          : 'inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800'
                      }
                    >
                      {todo.completed ? 'Completed' : 'Uncompleted'}
                    </p> */}
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
                      Created on{' '}
                      <time dateTime={todo.closeDate}>{todo.date}</time>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

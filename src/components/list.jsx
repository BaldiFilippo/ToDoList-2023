import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid'

const todos = [
  {
    id: 1,
    title: 'Back End Developer',
    completed: false,
    location: 'Remote',
    date: 'January 7, 2020',
  },
  {
    id: 2,
    title: 'Front End Developer',
    completed: true,
    location: 'Remote',
    date: 'January 7, 2020',
  },
  {
    id: 3,
    title: 'User Interface Designer',
    completed: false,
    location: 'Remote',
    date: 'January 14, 2020',
  },
]

export default function List() {
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
                    <p
                      className={
                        todo.completed
                          ? 'inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'
                          : 'inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800'
                      }
                    >
                      {todo.completed ? 'Completed' : 'Uncompleted'}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
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

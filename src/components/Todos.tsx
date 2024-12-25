import { useTodoContext } from "../contexts/TodoContext"

const Todos = () => {
  const { todos, dispatch } = useTodoContext()

  return (
    <div
      className={`max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md text-black`}
    >
      <h2
        className={`text-2xl font-bold mb-4 text-black`}
      >
        Todo List
      </h2>
      <ul
        className={`space-y-2 rounded-lg bg-slate-400`}
      >
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`
              flex items-center justify-between p-3 rounded-md
              
            `}
          >
            <span
              className={`${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              } text-black`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({type: "update", id: todo.id})}
              className={`
                    px-3 py-1 rounded-md text-sm
                    ${
                      todo.completed
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }
                  `}
            >
              {todo.completed ? "Done" : "Complete"}
            </button>
            <button
              onClick={() => dispatch({type: "delete", id: todo.id})}
              className={`px-3 py-1 rounded-md text-sm bg-pink-700`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todos
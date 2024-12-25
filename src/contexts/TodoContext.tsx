import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type ActionTypes = "add" | "update" | "delete" | undefined;

export interface Action {
  type: ActionTypes;
  payload?: string;
  id?: number;
}

interface TodoContextType {
  text: string;
  setText: (text: string) => void;
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
  handleSubmit: (e: React.FormEvent) => void;
}

// const initValue: Todo[] = [
//   { id: 1, text: "Learn React", completed: false },
//   { id: 2, text: "Build a project", completed: true },
//   { id: 3, text: "Deploy application", completed: false },
// ];

export const TodoContext = createContext<TodoContextType | null>(null);

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), text: action.payload as string, completed: false },
      ];
    case "update":
      const updatedTodos = state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      });

      return updatedTodos;
    case "delete":
      const filteredTodos = state.filter((todo) => todo.id !== action.id);
      return filteredTodos;
    default:
      return state;
  }
}

function TodoProvider({ children }: { children: JSX.Element }) {
  const savedTodos = localStorage.getItem("todos");

  const [text, setText] = useState("");

  const [todos, dispatch] = useReducer(
    reducer,
    savedTodos ? JSON.parse(savedTodos) : []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    dispatch({ type: "add", payload: text });
    setText("");
  }

  return (
    <TodoContext.Provider
      value={{ text, setText, todos, dispatch, handleSubmit }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("TodoContext must be inside TodoProvider");
  }

  return context;
}

export default TodoProvider;

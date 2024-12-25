import Form from "./components/Form"
import Todos from "./components/Todos"
import TodoProvider from "./contexts/TodoContext"

function App() {

  return (
    <TodoProvider>
      <>
        <Form></Form>
        <Todos></Todos>
      </>
    </TodoProvider>
  )
}

export default App

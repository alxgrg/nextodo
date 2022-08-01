import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

import AddTodoForm from './AddTodoForm';
import TodoCard from './TodoCard';

function Todo(props) {
  const [todos, setTodos] = useState(props.todos);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();

  async function addTodoHandler(todo) {
    setIsLoading(true);

    try {
      const user = session.user.id;
      const response = await fetch('/api/todo', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'There was a problem adding your todo.'
        );
      }
      setIsLoading(false);

      todo.id = data.newTodo.id;
      setTodos([...todos, todo]);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  }

  async function deleteTodoHandler(id) {
    try {
      const response = await fetch('/api/todo', {
        method: 'DELETE',
        body: JSON.stringify({
          id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function completeTodoHandler(id, completed) {
    try {
      const response = await fetch('/api/todo', {
        method: 'PATCH',
        body: JSON.stringify({ id, completed }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      const updatedTodos = todos;

      const todoIndex = todos.findIndex((todo) => todo.id === id);
      updatedTodos[todoIndex].completed = completed;

      setTodos([...updatedTodos]);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function editTodoHandler(id, title, description, completed) {
    try {
      const response = await fetch('/api/todo', {
        method: 'PATCH',
        body: JSON.stringify({ id, title, description, completed }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      const updatedTodos = todos;

      const todoIndex = todos.findIndex((todo) => todo.id === id);
      updatedTodos[todoIndex].completed = completed;
      updatedTodos[todoIndex].title = title;
      updatedTodos[todoIndex].description = description;

      setTodos([...updatedTodos]);
    } catch (error) {
      console.log(error.message);
    }
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div className='flex min-h-screen'>
        <section className='w-1/3 bg-gray-800 p-8'>
          <div className='mb-3'>
            <h2 className='text-3xl text-white'>Add a Todo, why dont you?</h2>
          </div>
          <AddTodoForm onAddTodo={addTodoHandler} />
        </section>
        <section className='w-2/3 p-8'>
          <div className='mb-3'>
            <h2 className='text-3xl text-gray-700'>Todo List</h2>
          </div>
          {/* {isEditing && <EditModal onClose={editModeHandler} />} */}
          {todos &&
            todos.map((todo) => (
              <div className='mb-3' key={todo.id}>
                <TodoCard
                  todo={todo}
                  onDeleteTodo={deleteTodoHandler}
                  onCompleteTodo={completeTodoHandler}
                  onEditTodo={editTodoHandler}
                />
              </div>
            ))}
        </section>
      </div>
    );
  }

  return (
    <>
      Not Signed in...
      <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default Todo;

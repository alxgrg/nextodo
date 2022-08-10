import { useState, useContext } from 'react';
import { useSession, signIn } from 'next-auth/react';

import NotificationContext from '../store/nottification-context';
import ModalContext from '../store/modal-context';

import AddTodoForm from './forms/AddTodoForm';
import TodoCard from './TodoCard';

function Todo(props) {
  const [todos, setTodos] = useState(props.todos);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState({
    id: '',
    show: false,
  });

  const notificationCtx = useContext(NotificationContext);
  const modalCtx = useContext(ModalContext);

  const { data: session, status } = useSession();

  async function addTodoHandler(todo) {
    notificationCtx.showNotification({
      title: 'Adding todo...',
      message: 'Your todo is being todone.',
      status: 'pending',
    });

    try {
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
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Todo successfully added!',
        status: 'success',
      });

      todo.id = data.newTodo.id;
      setTodos([todo, ...todos]);
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong!',
        status: 'error',
      });
    }
  }

  async function deleteTodoHandler(id) {
    setIsLoading(true);

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
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  }

  async function completeTodoHandler(id, completed) {
    setIsLoading(true);

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

      setIsLoading(false);

      setTodos([...updatedTodos]);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  }

  async function editTodoHandler(id, todo, completed) {
    setIsLoading(true);

    try {
      const response = await fetch('/api/todo', {
        method: 'PATCH',
        body: JSON.stringify({ id, todo, completed }),
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
      updatedTodos[todoIndex].todo = todo;

      modalCtx.hideModal();
      setTodos([...updatedTodos]);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // if (session) {
  return (
    <div className='flex flex-col min-h-screen'>
      <section className='flex flex-col w-full bg-gray-800 px-4 py-12'>
        <div className=''>
          <div className='mb-3'>
            <h2 className='text-3xl text-white text-center'>Add a Todo...</h2>
          </div>
          <AddTodoForm onAddTodo={addTodoHandler} isLoading={isLoading} />
        </div>
      </section>

      <section className='w-full p-8'>
        <div className='mb-3'>
          <h2 className='text-3xl text-gray-700'>Todo List</h2>
        </div>
        {/* {isEditing && <EditModal onClose={editModeHandler} />} */}
        {todos &&
          todos.map((todo) => (
            <div className='mb-3' key={todo.id}>
              {/* TODO finish loading state yadayadayada */}
              <TodoCard
                todo={todo}
                onDeleteTodo={deleteTodoHandler}
                onCompleteTodo={completeTodoHandler}
                onEditTodo={editTodoHandler}
                isEditing={isEditing}
                onSetIsEditing={modalCtx.showModal}
                isLoading={isLoading}
              />
            </div>
          ))}
      </section>
    </div>
  );
  // }

  // return (
  //   <div className='pt-12 px-4'>
  //     <div className='pt-12'>
  //       <p>Not Signed in...</p>

  //       <br />
  //       <button
  //         className='p-2 bg-slate-600 text-white'
  //         onClick={() => signIn()}
  //       >
  //         Sign in
  //       </button>
  //     </div>
  //   </div>
  // );
}

export default Todo;

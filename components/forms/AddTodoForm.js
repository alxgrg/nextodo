import { useRef } from 'react';

function AddTodoForm(props) {
  const todoInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const enteredTodo = todoInputRef.current.value;

    if (!enteredTodo || !enteredTodo.trim().length === 0) {
      console.log('Please enter a Todo before submitting.');
      return;
    }
    const newTodo = {
      todo: enteredTodo,
      completed: false,
    };
    props.onAddTodo(newTodo);
    todoInputRef.current.value = '';
  }

  return (
    <form
      className='flex justify-center sm:flex-row flex-col items-center'
      onSubmit={handleSubmit}
    >
      <div className='w-full sm:w-2/3'>
        <input
          type='text'
          placeholder='Todo...'
          name='todo'
          className='rounded-3xl p-4 text-xl w-full'
          ref={todoInputRef}
          autoComplete='off'
          required
        />
      </div>
      <div className='p-3' />
      <div>
        <button
          className='rounded-3xl p-4 bg-blue-600 text-white'
          disabled={props.isLoading}
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}

export default AddTodoForm;

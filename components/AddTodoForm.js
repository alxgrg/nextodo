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
    <form className='flex justify-center' onSubmit={handleSubmit}>
      <div className='w-2/3'>
        <input
          type='text'
          placeholder='Todo...'
          name='todo'
          className='rounded p-4 text-xl w-full mb-3'
          ref={todoInputRef}
          required
        />
      </div>
      <div className='p-3' />
      <div>
        <button className='rounded p-4 bg-blue-600 text-white'>Add Todo</button>
      </div>
    </form>
  );
}

export default AddTodoForm;

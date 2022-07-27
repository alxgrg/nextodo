import { useRef } from 'react';

function AddTodoForm(props) {
  const todoInputRef = useRef();
  const descriptionInputRef = useRef();

  function handleSubmit() {
    const enteredTodo = todoInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if (!enteredTodo || !enteredTodo.trim().length === 0) {
      console.log('Please enter a Todo before submitting.');
      return;
    }
    const newTodo = {
      todo: enteredTodo,
      description: enteredDescription,
    };
    props.onSubmit(newTodo);
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <div className='flex flex-col'>
        <div>
          <input
            type='text'
            placeholder='Todo...'
            name='todo'
            className='rounded p-4 text-xl w-full mb-3'
            ref={todoInputRef}
          />
        </div>
        <div>
          <textarea
            placeholder='Description...'
            name='description'
            cols='30'
            rows='10'
            className='rounded p-4 text-xl w-full mb-3'
            ref={descriptionInputRef}
          ></textarea>
        </div>
      </div>
      <div>
        <button className='rounded p-4 bg-blue-600 text-white'>Add Todo</button>
      </div>
    </form>
  );
}

export default AddTodoForm;
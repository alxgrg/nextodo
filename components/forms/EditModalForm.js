import { useState } from 'react';

export default function EditModalForm(props) {
  const [todo, setTodo] = useState(props.todo.todo);
  const [completed, setCompleted] = useState(props.todo.completed);
  const [error, setError] = useState();

  function submitHandler(event) {
    event.preventDefault();
    const id = props.todo.id;
    if (!todo || todo.trim().length === 0) {
      setError('Cannot save empty todo!');
      return;
    }
    props.onEditTodo(id, todo, completed);
  }

  function inputHandler(e) {
    setError(null);
    setTodo(e.target.value);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          {/* <input
            type='text'
            className='rounded p-4 text-xl w-full mb-3 border-2'
            value={todo}
            onFocus={() => setError(null)}
            onChange={inputHandler}
          /> */}
          <textarea
            type='text'
            className='rounded p-4 text-xl w-full mb-3 border-2'
            value={todo}
            onFocus={() => setError(null)}
            onChange={inputHandler}
          ></textarea>
          {error && <p className='text-red-600'>{error}</p>}
        </div>
        <div>
          <button className='rounded p-4 bg-blue-600 text-white mr-3'>
            Save changes
          </button>
          <button
            className='rounded p-4 bg-red-600 text-white'
            type='button'
            onClick={props.onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

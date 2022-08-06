import { useState } from 'react';

export default function EditModalForm(props) {
  const [todo, setTodo] = useState(props.todo.todo);
  const [completed, setCompleted] = useState(props.todo.completed);

  function submitHandler(event) {
    const id = props.todo.id;
    event.preventDefault();
    props.onEditTodo(id, todo, completed);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type='text'
            className='rounded p-4 text-xl w-full mb-3'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>
        <div>
          <button className='rounded p-4 bg-blue-600 text-white mr-3'>
            Save changes
          </button>
        </div>
      </form>
      <button
        className='rounded p-4 bg-red-600 text-white'
        onClick={props.onClose}
      >
        Cancel
      </button>
    </div>
  );
}

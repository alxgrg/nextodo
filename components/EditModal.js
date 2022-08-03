import ReactDOM from 'react-dom';
import { useState } from 'react';

export default function EditModal(props) {
  const [todo, setTodo] = useState(props.todo.todo);
  const [completed, setCompleted] = useState(props.todo.completed);

  function submitHandler(event) {
    const id = props.todo.id;
    event.preventDefault();
    props.onEditTodo(id, todo, completed);
  }

  return ReactDOM.createPortal(
    <div className='bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 min-h-screen'>
      <div className='bg-slate-600 px-16 py-14 rounded-md text-center'>
        <div className='mb-3'>
          <h1 className='text-white text-2xl'>Modal edit mode</h1>
        </div>

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
      </div>
    </div>,
    document.getElementById('modals')
  );
}

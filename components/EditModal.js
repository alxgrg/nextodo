import ReactDOM from 'react-dom';
import { useState } from 'react';

export default function EditModal(props) {
  const [title, setTitle] = useState(props.todo.title);
  const [description, setDescription] = useState(props.todo.description);
  const [completed, setCompleted] = useState(props.todo.completed);

  function submitHandler(event) {
    const id = props.todo.id;
    event.preventDefault();
    props.onEditTodo(id, title, description, completed);
  }

  return ReactDOM.createPortal(
    <div className='bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0'>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <textarea
                placeholder='Description...'
                name='description'
                cols='30'
                rows='8'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='rounded p-4 text-xl w-full mb-3'
              ></textarea>
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

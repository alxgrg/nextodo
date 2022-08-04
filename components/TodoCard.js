import { useState } from 'react';

import EditModal from './EditModal';

function TodoCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const { id, todo, completed } = props.todo;

  return (
    <>
      <div className='relative border rounded-lg p-4 flex justify-between'>
        <div className='p-2'>
          <p className='text-2xl'>{todo}</p>
        </div>

        <div>
          <div className='mb-3'>
            {completed ? (
              <button
                className='p-2 rounded bg-green-600 text-white'
                onClick={() => props.onCompleteTodo(id, !completed)}
              >
                ✓
              </button>
            ) : (
              <button
                className='p-2 rounded bg-slate-800 text-white'
                onClick={() => props.onCompleteTodo(id, !completed)}
              >
                -
              </button>
            )}
          </div>
          <div className='mb-3'>
            <button
              className='p-2 rounded bg-gray-600 text-white'
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
          <div className=''>
            <button
              className='p-2 rounded bg-red-600 text-white'
              onClick={() => props.onDeleteTodo(id)}
            >
              X
            </button>
          </div>
        </div>
      </div>
      {isEditing && (
        <EditModal
          onClose={() => setIsEditing(false)}
          todo={props.todo}
          onEditTodo={props.onEditTodo}
        />
      )}
    </>
  );
}

export default TodoCard;

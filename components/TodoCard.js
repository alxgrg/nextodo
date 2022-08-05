import { useState } from 'react';
import { Image } from 'next/image';

import EditModal from './EditModal';
import EditIcon from '../assets/icons/EditIcon';
import DeleteIcon from '../assets/icons/DeleteIcon';
import CompleteIcon from '../assets/icons/CompleteIcon';
import IncompleteIcon from '../assets/icons/IncompleteIcon';

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
                title='Mark todo incomplete'
                className='p-2 rounded bg-green-600 text-white'
                onClick={() => props.onCompleteTodo(id, !completed)}
              >
                <CompleteIcon />
              </button>
            ) : (
              <button
                title='Mark todo complete'
                className='p-2 rounded bg-slate-400 text-white'
                onClick={() => props.onCompleteTodo(id, !completed)}
              >
                <IncompleteIcon />
              </button>
            )}
          </div>
          <div className='mb-3'>
            <button
              title='Edit todo'
              className='p-2 rounded bg-gray-700 text-white'
              onClick={() =>
                props.onSetIsEditing({ id: props.todo.id, show: true })
              }
            >
              <EditIcon />
            </button>
          </div>
          <div className=''>
            <button
              title='Delete todo'
              className='p-2 rounded bg-red-600 text-white'
              onClick={() => props.onDeleteTodo(id)}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
      {props.isEditing.show && props.isEditing.id === props.todo.id && (
        <EditModal
          onClose={() => props.onSetIsEditing(false)}
          todo={props.todo}
          onEditTodo={props.onEditTodo}
        />
      )}
    </>
  );
}

export default TodoCard;

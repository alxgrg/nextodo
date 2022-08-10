import { useState, useContext } from 'react';

import ModalContext from '../store/modal-context';

import EditIcon from '../assets/icons/EditIcon';
import DeleteIcon from '../assets/icons/DeleteIcon';
import CompleteIcon from '../assets/icons/CompleteIcon';
import IncompleteIcon from '../assets/icons/IncompleteIcon';
import EditModalForm from './forms/EditModalForm';
import Modal from './ui/Modal';

function TodoCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const { id, todo, completed } = props.todo;

  const modalCtx = useContext(ModalContext);

  return (
    <>
      <div
        className={`relative border ${
          completed && 'border-green-600 '
        } rounded-lg p-4 flex flex-col sm:flex-row justify-between`}
      >
        <div className='flex items-center'>
          <div className='mr-4'>
            {completed ? (
              <button
                title='Mark todo incomplete'
                className='p-2 rounded text-green-600'
                onClick={() => props.onCompleteTodo(id, !completed)}
              >
                <CompleteIcon />
              </button>
            ) : (
              <button
                title='Mark todo complete'
                className='p-2 rounded text-black'
                onClick={() => props.onCompleteTodo(id, !completed)}
              >
                <IncompleteIcon />
              </button>
            )}
          </div>
          <div className='p-2'>
            <p className='text-2xl break-all'>{todo}</p>
          </div>
          {/* TODO Finish loading state.... */}
          {props.isLoading && <div>Loading</div>}
        </div>

        <div className='flex flex-col'>
          <div className='mb-3'>
            <button
              title='Edit todo'
              className='rounded text-black'
              onClick={() => props.onSetIsEditing(props.todo.id)}
            >
              <EditIcon />
            </button>
          </div>
          <div className=''>
            <button
              title='Delete todo'
              className='rounded text-red-500'
              onClick={() => props.onDeleteTodo(id)}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
      {modalCtx.modal && modalCtx.modal.id === props.todo.id && (
        <Modal>
          <EditModalForm
            todo={props.todo}
            onClose={modalCtx.hideModal}
            onEditTodo={props.onEditTodo}
          />
        </Modal>
      )}
    </>
  );
}

export default TodoCard;

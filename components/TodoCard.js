import { useState, useContext } from 'react';

import ModalContext from '../store/modal-context';

import EditIcon from '../assets/icons/EditIcon';
import DeleteIcon from '../assets/icons/DeleteIcon';
import CompleteIcon from '../assets/icons/CompleteIcon';
import IncompleteIcon from '../assets/icons/IncompleteIcon';
import EditModalForm from './forms/EditModalForm';
import Modal from './ui/Modal';

function TodoCard(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { id, todo, completed } = props.todo;

  const modalCtx = useContext(ModalContext);
  async function completeTodoHandler() {
    setIsLoading(true);
    const res = await props.onCompleteTodo(id, !completed);
    setIsLoading(false);
  }
  return (
    <>
      <div
        className={`relative border ${
          completed && 'border-green-600 '
        } rounded-lg p-4 flex flex-col sm:flex-row justify-between ${
          props.isLoading && 'animate-pulse'
        }`}
      >
        <div className='flex items-center'>
          <div className='mr-2'>
            {completed ? (
              <button
                title='Mark todo incomplete'
                className='rounded text-green-600'
                onClick={completeTodoHandler}
              >
                <CompleteIcon />
              </button>
            ) : (
              <button
                title='Mark todo complete'
                className='rounded text-black'
                onClick={completeTodoHandler}
              >
                <IncompleteIcon />
              </button>
            )}
          </div>
          <div className='p-2'>
            <p className='text-2xl break-word'>{todo}</p>
          </div>
        </div>

        <div className='flex sm:flex-col flex-row justify-end'>
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

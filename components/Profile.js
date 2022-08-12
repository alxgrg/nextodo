import { useContext } from 'react';
import { useRouter } from 'next/router';

import NotificationContext from '../store/nottification-context';
import ModalContext from '../store/modal-context';

import EditUserProfileForm from './forms/EditUserProfileForm';
import Modal from './ui/Modal';
import ConfirmDeleteAccount from './ui/ConfirmDeleteAccount';

export default function Profile({ user }) {
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const modalCtx = useContext(ModalContext);

  async function changeNameHandler(name) {
    try {
      const response = await fetch('/api/user', {
        method: 'PATCH',
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not change name!');
      }
      router.reload();
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: data.message,
        status: 'error',
      });
    }
  }

  async function deleteAccountHandler() {
    modalCtx.hideModal();

    notificationCtx.showNotification({
      title: 'Deleting account...',
      message: 'Your account is being deleted.',
      status: 'pending',
    });

    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
        body: JSON.stringify({
          id: user.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      notificationCtx.showNotification({
        title: 'Success!',
        message: data.message,
        status: 'success',
      });

      router.reload();
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message,
        status: 'error',
      });
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='p-5 flex flex-col text-center items-center'>
        <div className='p-3' />
        <h1 className='text-3xl'>{user.name}</h1>
        <p>{user.email}</p>
        <div className='p-2' />
        <EditUserProfileForm onChangeName={changeNameHandler} />
        <div className='p-5' />
        <div>
          <button
            className='p-3 bg-red-600 text-white rounded'
            onClick={modalCtx.showModal}
          >
            Delete account
          </button>
        </div>
      </div>

      {modalCtx.modal && (
        <Modal>
          <ConfirmDeleteAccount
            onConfirm={deleteAccountHandler}
            onCancel={modalCtx.hideModal}
          />
        </Modal>
      )}
    </div>
  );
}

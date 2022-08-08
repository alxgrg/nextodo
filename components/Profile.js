import { useRef } from 'react';
import Router from 'next/router';

import EditUserProfileForm from './forms/EditUserProfileForm';

export default function Profile({ user }) {
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
      Router.reload();
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='flex justify-center'>
      <div className='p-5 flex flex-col text-center'>
        <h1 className='text-3xl'>{user.name}</h1>
        <p>{user.email}</p>
        <EditUserProfileForm onChangeName={changeNameHandler} />
      </div>
    </div>
  );
}

import { useRef } from 'react';

import Profile from '../components/Profile';

import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

export default function Me(props) {
  const nameInputRef = useRef();

  async function changeNameHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    console.log(enteredName);
    try {
      const response = await fetch('/api/user', {
        method: 'PATCH',
        body: JSON.stringify({
          name: enteredName,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not change name!');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='flex flex-col'>
      <Profile user={props.user} />
      <form onSubmit={changeNameHandler}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' ref={nameInputRef} />
        <button type='submit'>Change name</button>
      </form>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  // redirect if not session
  return {
    props: {
      user: session.user,
    },
  };
}

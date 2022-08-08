import { useRef } from 'react';

export default function EditUserProfileForm(props) {
  const nameInputRef = useRef();

  function handleChangeName(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;

    if (enteredName.trim().length === 0) {
      return;
    }
    props.onChangeName(enteredName);
  }

  return (
    <form onSubmit={handleChangeName}>
      <input
        type='text'
        name='name'
        ref={nameInputRef}
        className='rounded border p-4 text-xl w-full mb-3'
        placeholder='Change name here...'
      />
      <button className='p-3 bg-slate-800 text-white rounded' type='submit'>
        Change name
      </button>
    </form>
  );
}

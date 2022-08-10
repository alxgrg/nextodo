export default function ConfirmDeleteAccount(props) {
  return (
    <div>
      <h2 className='text-xl'>
        Are you sure you want to permanently delete your account?
      </h2>
      <div>
        <button
          onClick={() => props.onConfirm()}
          className='p-3 bg-green-600 text-white'
        >
          Confirm
        </button>
        <button
          onClick={() => props.onCancel()}
          className='p-3 bg-red-600 text-white'
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

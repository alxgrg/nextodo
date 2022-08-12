export default function ConfirmDeleteAccount(props) {
  return (
    <div>
      <h2 className='text-xl'>
        Are you sure you want to permanently delete your account?
      </h2>
      <div className='mt-4'>
        <button
          onClick={() => props.onConfirm()}
          className='p-3 bg-green-600 text-white mr-3 rounded'
        >
          Confirm
        </button>
        <button
          onClick={() => props.onCancel()}
          className='p-3 bg-red-600 text-white rounded'
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

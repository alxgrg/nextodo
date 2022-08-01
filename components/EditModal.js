import ReactDOM from 'react-dom';

export default function EditModal(props) {
  return ReactDOM.createPortal(
    <div
      className='bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0'
      onClick={props.onClose}
    >
      <div className='bg-white px-16 py-14 rounded-md text-center'>
        <h1>Testing modal</h1>
        <div>
          <p>testing 123</p>
        </div>
      </div>
    </div>,
    document.getElementById('modals')
  );
}

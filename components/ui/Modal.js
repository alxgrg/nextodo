import ReactDOM from 'react-dom';

export default function Modal(props) {
  return ReactDOM.createPortal(
    <div className='bg-slate-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 min-h-screen'>
      <div className='bg-white px-16 py-14 rounded-md text-center'>
        {props.children}
      </div>
    </div>,
    document.getElementById('modals')
  );
}

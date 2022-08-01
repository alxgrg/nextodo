import ReactDOM from 'react-dom';

export default function Notification() {
  return ReactDOM.createPortal(
    <div className='p-5 bg-orange-500 text-white text-2xl'>
      <p>This is a notification</p>
    </div>,
    document.getElementById('notifications')
  );
}

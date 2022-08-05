import { useContext } from 'react';

import NotificationContext from '../../store/nottification-context';

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = 'bg-green-600';
  }

  if (status === 'error') {
    statusClasses = 'bg-red-600';
  }

  if (status === 'pending') {
    statusClasses = 'bg-blue-400';
  }

  const notificationClasses =
    'flex justify-between items-center fixed left-0 bottom-0 h-20 w-full bg-slate-800 text-white p-5';

  const activeClasses = notificationClasses + ' ' + statusClasses;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;

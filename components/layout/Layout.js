import { useContext } from 'react';
import NotificationContext from '../../store/nottification-context';

import Notification from '../ui/Notification';
import NavBar from './NavBar';

export default function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;
  return (
    <>
      <NavBar />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}

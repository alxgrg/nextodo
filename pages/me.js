import Profile from '../components/Profile';

import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

export default function Me(props) {
  return (
    <div className='flex flex-col'>
      <Profile user={props.user} />
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

import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    res.send('test -- signed in');
  } else {
    res.send('test -- signed out');
  }
}

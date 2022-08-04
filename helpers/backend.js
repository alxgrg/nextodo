import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { prisma } from './db';

export async function getUserId(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const currentUser = await prisma.user.findFirst({
    where: { email: session.user.email },
  });

  const currentUserId = currentUser.id;

  return currentUserId;
}

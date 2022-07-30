import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../helpers/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions);
    const currentUser = await prisma.user.findFirst({
      where: { email: session.user.email },
    });

    const currentUserId = currentUser.id;
    try {
      const todo = req.body;
      // console.log(session.user);
      const newTodo = await prisma.todo.create({
        data: {
          ...todo,
          userId: currentUserId,
        },
      });
      res.status(200).json({ message: 'created todo', newTodo });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}

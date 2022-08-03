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
      res.status(201).json({ message: 'created todo', newTodo });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    const session = await unstable_getServerSession(req, res, authOptions);
    const currentUser = await prisma.user.findFirst({
      where: { email: session.user.email },
    });

    const currentUserId = currentUser.id;

    try {
      const deleteTodo = await prisma.todo.deleteMany({
        where: {
          id: id,
          userId: currentUserId,
        },
      });
      res.status(201).json({ message: 'Todo deleted', deleteTodo });
    } catch (error) {
      res.status(500).json({ message: 'Could not delete todo!' });
    }
  }

  if (req.method === 'PATCH') {
    let dataObj;
    if (req.body.todo) {
      const { id, todo, completed } = req.body;
      dataObj = { id, todo, completed };
    } else {
      const { id, completed } = req.body;
      dataObj = { id, completed };
    }
    console.log(dataObj);
    const session = await unstable_getServerSession(req, res, authOptions);
    const currentUser = await prisma.user.findFirst({
      where: { email: session.user.email },
    });

    const currentUserId = currentUser.id;

    try {
      const completeTodo = await prisma.todo.updateMany({
        where: {
          id: dataObj.id,
          userId: currentUserId,
        },
        data: {
          ...dataObj,
        },
      });
      res.status(200).json({ message: 'Updated todo status', completeTodo });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
  }
}

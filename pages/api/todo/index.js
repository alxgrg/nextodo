// import { unstable_getServerSession } from 'next-auth/next';

import { prisma } from '../../../helpers/db';
import { getUserId } from '../../../helpers/backend';

export default async function handler(req, res) {
  const currentUserId = await getUserId(req, res);
  if (req.method === 'POST') {
    try {
      const todo = req.body;

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

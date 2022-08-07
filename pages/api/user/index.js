import { getUserId } from '../../../helpers/backend';
import { prisma } from '../../../helpers/db';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const userId = await getUserId(req, res);

    try {
      const newName = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: req.body.name,
        },
      });
      res.status(201).json({ message: 'Successfully updated name', newName });
    } catch (error) {
      res.status(500).json({ message: 'Could not complete name change' });
    }
  }
}

import { Router } from 'express';
import { currentUser } from '@jvdtickets/common';

const router = Router();

router.get('/api/users/current-user', currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

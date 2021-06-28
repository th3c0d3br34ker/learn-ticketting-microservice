import { Router } from 'express';
import { verify } from 'jsonwebtoken';

const router = Router();

router.get('/api/users/current-user', (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = verify(req.session.jwt, process.env.JWT_KEY!);
    return res.send({ currentUser: payload });
  } catch (error) {
    console.log('Error: Invalid JWT Token!');
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };

import { Router } from 'express';

const router = Router();

router.post('/api/users/signout', (req, res) => {
  res.send('Hi there! Signout');
});

export { router as signOutRouter };

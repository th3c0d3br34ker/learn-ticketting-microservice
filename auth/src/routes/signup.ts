import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { sign } from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';

const router = Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid!'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20.'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log(`Email : ${email} already in use!`);

      throw new BadRequestError(`Email : ${email} already in use!`);
    }

    console.log(`Creating a user with email : ${email}`);
    const user = User.build({ email, password });
    await user.save();

    // Generate JWT and store it on the session.
    const userJWT = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJWT };

    return res.status(201).send({
      success: true,
      message: `Created a user with email : ${email}`,
      data: { user },
    });
  }
);

export { router as signUpRouter };

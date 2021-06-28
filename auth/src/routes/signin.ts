import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { sign } from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid!'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password must be supplied!'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log(`Email : ${email} not found!`);
      throw new BadRequestError('Invalid credentials!');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      console.log(`Email : ${email} incorrect passowrd!`);
      throw new BadRequestError('Invalid credentials!');
    }

    const userJWT = sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJWT };

    return res.send({
      success: true,
      message: `Signin successful with email : ${email}`,
      data: { existingUser },
    });
  }
);

export { router as signInRouter };

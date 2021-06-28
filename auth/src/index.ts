import express, { json } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from './routes/current-users';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true);

const PORT = 3000;

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(currentUserRouter);

app.use(errorHandler);

app.all('*', () => {
  throw new NotFoundError();
});

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY not defined!');
    }
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log('Error : ', error);
  }
};

app.listen(PORT, () => {
  console.log(
    `Auth Service v${process.env.npm_package_version} started on PORT: ${PORT}`
  );
});

start();

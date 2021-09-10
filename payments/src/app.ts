import express, { json } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler, currentUser } from '@jvdtickets/common';

import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(errorHandler);

app.use(currentUser);

app.use(createChargeRouter);

app.all('*', () => {
  throw new NotFoundError();
});

export const PORT = 3000;

export default app;

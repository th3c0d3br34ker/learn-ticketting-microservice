import express, { json } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { NotFoundError, errorHandler, currentUser } from '@jvdtickets/common';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';

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

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all('*', () => {
  throw new NotFoundError();
});

export const PORT = 3000;

export default app;

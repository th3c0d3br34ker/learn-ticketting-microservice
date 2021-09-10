import express, { json } from 'express';
import 'express-async-errors';

import { NotFoundError, errorHandler, currentUser } from '@jvdtickets/common';

const app = express();
app.set('trust proxy', true);

app.use(json());

app.use(errorHandler);

app.use(currentUser);

app.all('*', () => {
  throw new NotFoundError();
});

export const PORT = 3000;

export default app;

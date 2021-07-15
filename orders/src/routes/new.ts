import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@jvdtickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Types } from 'mongoose';
import { Order, OrderStatus, Ticket } from '../models';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 10 * 60;

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .notEmpty()
      .custom((input: string) => Types.ObjectId.isValid(input))
      .withMessage('Ticket ID must be provided!'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // Find the ticket the user is trying to order.
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    // Check if the Ticket is not already reserved.
    const isReserved = await Ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved!');
    }

    // Calculate and expiration time.
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build order and save it to database.
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.CREATED,
      expiresAt: expiration,
      ticket,
    });
    await order.save();

    // Publish order:created event.

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };

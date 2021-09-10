import {
  ExpirationCompleteEvent,
  OrderStatus,
  Subjects,
} from '@jvdtickets/common';
import Listener from '@jvdtickets/common/build/events/base-listener';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
import { queueGroupName } from './queue-group-name';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket');

    if (!order) {
      throw new Error('Order not found!');
    }

    if (order.status === OrderStatus.COMPLETE) {
      return msg.ack();
    }

    order.set({
      status: OrderStatus.CANCELLED,
    });

    await order.save();

    new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}

import { Message } from 'node-nats-streaming';
import { OrderCreatedEvent, Subjects } from '@jvdtickets/common';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models';
import Listener from '@jvdtickets/common/build/events/base-listener';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();

    msg.ack();
  }
}

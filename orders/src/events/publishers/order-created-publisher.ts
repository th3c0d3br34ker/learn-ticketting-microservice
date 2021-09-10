import { OrderCreatedEvent, Subjects } from '@jvdtickets/common';
import Publisher from '@jvdtickets/common/build/events/base-publisher';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

import { Subjects, OrderCancelledEvent } from '@jvdtickets/common';
import Publisher from '@jvdtickets/common/build/events/base-publisher';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

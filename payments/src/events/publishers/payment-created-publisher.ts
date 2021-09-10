import { Subjects, PaymentCreatedEvent } from '@jvdtickets/common';
import Publisher from '@jvdtickets/common/build/events/base-publisher';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

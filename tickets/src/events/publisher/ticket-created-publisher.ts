import { Subjects, TicketCreatedEvent } from '@jvdtickets/common';
import Publisher from '@jvdtickets/common/build/events/base-publisher';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'ticket-created';
}

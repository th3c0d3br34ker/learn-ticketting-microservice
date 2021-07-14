import { Subjects, TicketUpdatedEvent } from '@jvdtickets/common';
import Publisher from '@jvdtickets/common/build/events/base-publisher';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = 'ticket-updated';
}

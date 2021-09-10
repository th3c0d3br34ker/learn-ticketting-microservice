import { ExpirationCompleteEvent, Subjects } from '@jvdtickets/common';
import Publisher from '@jvdtickets/common/build/events/base-publisher';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

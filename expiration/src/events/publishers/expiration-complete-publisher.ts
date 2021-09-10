import { Subjects, ExpirationComplete } from '@jvdtickets/common';
import Publisher from '@jvdtickets/common/build/events/base-publisher';

export class ExpirationCompletePublisher extends Publisher<ExpirationComplete> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

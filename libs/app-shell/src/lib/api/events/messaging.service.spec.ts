import {
    inject,
    TestBed
} from '@angular/core/testing';
import { MessagingService } from './messaging.service';
import { MessagingModule } from './messaging.module';
import {
    EventType,
    Message,
    TextMessage
} from './event-bus';

describe('MessagingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MessagingModule
            ]
        });
    });


    it('should be created', inject(
        [MessagingService], (service: MessagingService) => {
            expect(service).toBeTruthy();
        }
    ));


    describe('Default event', () => {


        it('should not receive any message when subscribing after its published', inject(
            [MessagingService], (service: MessagingService) => {

                const eventType = EventType.DEFAULT;
                const publisher = service.createPublisher('system:events', eventType);
                const subscriber = service.createSubscriber('system:events', eventType);

                const m = new TextMessage('system:events');
                m.text = 'app registered';
                publisher.publish(m);

                let expectedMessage;
                subscriber.onMessage((msg: Message) => {
                    expectedMessage = (msg as TextMessage).text;

                });
                subscriber.unSubscribe();

                expect(expectedMessage).toBeUndefined();
            }
        ));

        it('should receive message by specific topic when subscribing before its published', inject(
            [MessagingService], (service: MessagingService) => {

                const publisher = service.createPublisher('system:events', EventType.DEFAULT);
                const subscriber = service.createSubscriber('system:events', EventType.DEFAULT);


                let expectedMessage;
                subscriber.onMessage((msg: Message) => {
                    expectedMessage = (msg as TextMessage).text;
                });

                const m = new TextMessage('system:events');
                m.text = 'app registered';
                publisher.publish(m);

                subscriber.unSubscribe();
                expect(expectedMessage).toBe(m.text);
            }
        ));


        it('should receive message by specific topic and more topics exists, when subscribing before its published',
            inject(
                [MessagingService], (service: MessagingService) => {

                    const publisher = service.createPublisher('system:events', EventType.DEFAULT);
                    const publisherXXXX = service.createPublisher('system:XXX', EventType.DEFAULT);
                    const subscriber = service.createSubscriber('system:events', EventType.DEFAULT);


                    let expectedMessage;
                    subscriber.onMessage((msg: Message) => {
                        expectedMessage = (msg as TextMessage).text;
                    });

                    const m = new TextMessage('system:events');
                    m.text = 'app registered';
                    publisher.publish(m);
                    publisherXXXX.publish(m);

                    subscriber.unSubscribe();
                    expect(expectedMessage).toBe(m.text);
                }
            ));

    });


    describe('Only Last', () => {


        it('should receive a message when subscribing after its published', inject(
            [MessagingService], (service: MessagingService) => {

                const eventType = EventType.ONLY_LAST;
                const publisher = service.createPublisher('system:events', eventType);
                const subscriber = service.createSubscriber('system:events', eventType);

                const m1 = new TextMessage('system:events');
                m1.text = 'app registered';

                const m2 = new TextMessage('system:events');
                m2.text = 'app registered';

                const m3 = new TextMessage('system:events');
                m3.text = 'app registered';

                publisher.publish(m1);
                publisher.publish(m2);
                publisher.publish(m3);

                const expectedMessages: string[] = [];
                subscriber.onMessage((msg: Message) => {
                    expectedMessages.push((msg as TextMessage).text);
                });
                subscriber.unSubscribe();
                expect(expectedMessages.length).toBe(1);
            }
        ));

        it('should receive only last message message, when subscribing before publish ', inject(
            [MessagingService], (service: MessagingService) => {

                const publisher = service.createPublisher('system:events', EventType.ONLY_LAST);
                const subscriber = service.createSubscriber('system:events', EventType.ONLY_LAST);


                const m = new TextMessage('system:events');
                m.text = 'app registered';

                const m2 = new TextMessage('system:events');
                m2.text = 'app registered 2';
                publisher.publish(m);
                publisher.publish(m2);


                let expectedMessage;
                subscriber.onMessage((msg: Message) => {
                    expectedMessage = (msg as TextMessage).text;
                });

                subscriber.unSubscribe();
                expect(expectedMessage).toBe(m2.text);
            }
        ));

    });


    describe('Durable', () => {


        it('should receive all message when subscribing after its published', inject(
            [MessagingService], (service: MessagingService) => {

                const eventType = EventType.DURABLE;
                const publisher = service.createPublisher('system:events', eventType);
                const subscriber = service.createSubscriber('system:events', eventType);

                const m1 = new TextMessage('system:events');
                m1.text = 'app registered';

                const m2 = new TextMessage('system:events');
                m2.text = 'app registered';


                const m3 = new TextMessage('system:events');
                m3.text = 'app registered';


                const m4 = new TextMessage('system:events');
                m4.text = 'app registered';
                publisher.publish(m1);
                publisher.publish(m2);
                publisher.publish(m3);
                publisher.publish(m4);

                const expectedMessages: string[] = [];
                subscriber.onMessage((msg: Message) => {
                    expectedMessages.push((msg as TextMessage).text);

                });
                subscriber.unSubscribe();
                expect(expectedMessages.length).toBe(4);
            }
        ));
    });


});

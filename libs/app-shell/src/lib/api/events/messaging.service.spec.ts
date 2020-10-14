import {
    inject,
    TestBed
} from '@angular/core/testing';
import { MessagingService } from './messaging.service';
import {
    EventType,
    Message,
    TextMessage
} from './message-bus';
import { AppShellModule } from '../../app-shell.module';
import { MessagingTopics } from '../../api/events/topics.service';


describe('MessagingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppShellModule.forRoot('')
            ],
            providers: []
        });
    });


    it('should be created', inject(
        [MessagingService], (service: MessagingService) => {
            expect(service).toBeTruthy();
        }
    ));

    describe('Topics', () => {


        it('should find exact match of topic if it is defined', inject(
            [MessagingService, MessagingTopics],
            (service: MessagingService, t: MessagingTopics) => {

                t.define({
                    name: 'system:events',
                    eventType: EventType.DEFAULT, shared: true
                });
                const topic = t.get('system:events');


                expect(topic).toBeDefined();
            }
        ));


    });

    describe('Default event', () => {


        it('should not receive any message when subscribing after its published', inject(
            [MessagingService, MessagingTopics],
            (service: MessagingService, t: MessagingTopics) => {

                t.define({
                    name: 'system:events',
                    eventType: EventType.DEFAULT, shared: true
                });


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

        it('onMessage(): should not receive any message when subscribing after its published', inject(
            [MessagingService, MessagingTopics],
            (service: MessagingService, t: MessagingTopics) => {

                t.define({
                    name: 'system:events',
                    eventType: EventType.DEFAULT, shared: true
                });
                const m = new TextMessage('system:events');
                m.text = 'app registered';
                service.publish('system:events', m);

                let expectedMessage;
                service.subscribe('system:events', (msg: Message) => {
                    expectedMessage = (msg as TextMessage).text;
                });
                expect(expectedMessage).toBeUndefined();
            }
        ));


        it('should receive message by specific topic when subscribing before its published', inject(
            [MessagingService, MessagingTopics],
            (service: MessagingService, t: MessagingTopics) => {

                t.define({
                    name: 'system:events',
                    eventType: EventType.DEFAULT, shared: true
                });

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

        it('onMessage():  should receive message by specific topic when subscribing before its published', inject(
            [MessagingService, MessagingTopics],
            (service: MessagingService, t: MessagingTopics) => {

                t.define({
                    name: 'system:events',
                    eventType: EventType.DEFAULT, shared: true
                });
                let expectedMessage = 'none';
                service.subscribe('system:events', (msg: Message) => {
                    expectedMessage = (msg as TextMessage).text;
                });

                const m = new TextMessage('system:events');
                m.text = 'app registered';
                service.publish('system:events', m);

                expect(expectedMessage).toBe(m.text);
            }
        ));


        it('should receive message by specific topic and more topics exists, when subscribing before its published',
            inject(
                [MessagingService, MessagingTopics],
                (service: MessagingService, t: MessagingTopics) => {

                    t.define({
                        name: 'system:events',
                        eventType: EventType.DEFAULT, shared: true
                    });

                    t.define({
                        name: 'system:XXX',
                        eventType: EventType.DEFAULT, shared: true
                    });

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
            [MessagingService, MessagingTopics],
            (service: MessagingService, t: MessagingTopics) => {

                t.define({
                    name: 'system:events',
                    eventType: EventType.ONLY_LAST, shared: true
                });

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
            [MessagingService, MessagingTopics],
            (service: MessagingService, t: MessagingTopics) => {

                t.define({
                    name: 'system:events',
                    eventType: EventType.ONLY_LAST, shared: true
                });


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
            [MessagingService, MessagingTopics],
            (service: MessagingService, t: MessagingTopics) => {

                t.define({
                    name: 'system:events',
                    eventType: EventType.DURABLE, shared: true
                });


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

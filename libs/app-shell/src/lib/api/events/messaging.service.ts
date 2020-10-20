import {
    Channel,
    EventType,
    Message,
    MessageBus,
    NativeTopicPublisher,
    NativeTopicSubscriber,
    RxJSTopicPublisher,
    RxJSTopicSubscriber,
    TopicPublisher,
    TopicSubscriber
} from './message-bus';
import {
    Injectable,
    OnDestroy
} from '@angular/core';
import { MessagingConfig } from './messaging.config';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { MessagingTopics } from './topics.service';


/**
 * Messaging service supports 3 types of events:
 *
 *  - DEFAULT Event:
 *  - Last Value Event:
 *  - History Value Event:
 */
@Injectable({ providedIn: 'root' })
export class MessagingService implements MessageBus<Message>, OnDestroy {
    private publishers: Map<string, TopicPublisher<Message>> = new Map<string, TopicPublisher<Message>>();
    private subscriptions: Array<TopicSubscriber<Message>>;


    constructor(private _config: MessagingConfig, private _pubSubService: NgxPubSubService,
                private topics: MessagingTopics) {
        this.subscriptions = [];
    }


    subscribe(topic: string, event: (value: Message) => void,
              messageSelector?: (msg: Message) => boolean): TopicSubscriber<Message> {
        const topicDef = this.topics.get(topic);
        if (!topicDef) {
            throw new Error('Invalid topic name: ' + topic);
        }
        const newSubscription = this.createSubscriber(topic, topicDef.eventType, messageSelector);
        this.subscriptions.push(newSubscription);
        newSubscription.onMessage((m: Message) => event(m));

        return newSubscription;
    }


    publish(topic: string, message: Message): void {
        const topicDef = this.topics.get(topic);
        if (!topicDef) {
            throw new Error('Invalid topic name: ' + topic);
        }

        let publisher: TopicPublisher<Message>;
        if (this.publishers.has(topic)) {
            publisher = this.publishers.get(topic);
        } else {
            publisher = this.createPublisher(topic, topicDef.eventType);
            this.publishers.set(topicDef.name, publisher);
        }
        publisher.publish(message);
    }

    /**
     * This will became private API, please do not use. Use sentTo instead
     * @deprecated
     *
     */
    createPublisher<T extends Message>(topic: string, type?: EventType): TopicPublisher<T> {
        this.assertTopicName(topic, type);
        const eventType = type || this.topics.get((topic))?.eventType;

        if (this._config.channel === Channel.RxJS) {
            const publisher = new RxJSTopicPublisher<T>(topic, eventType);
            return this.doCreateRxJSPublisher(publisher);
        } else {
            return new NativeTopicPublisher(topic, eventType);
        }
    }


    /**
     * This will became private API, please do not use. Use onMessage instead
     *
     * @deprecated
     *
     */
    createSubscriber<T extends Message>(topic: string, type?: EventType,
                                        messageSelector?: (msg: Message) => boolean): TopicSubscriber<T> {
        this.assertTopicName(topic, type);
        const eventType = type || this.topics.get((topic))?.eventType;

        if (this._config.channel === Channel.RxJS) {
            const publisher = new RxJSTopicSubscriber<T>(topic, eventType);
            return this.doCreateRxJSSubscriber<T>(publisher);
        }

        return new NativeTopicSubscriber(topic, eventType);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unSubscribe());
        this.publishers.forEach((v, k) =>
            this._pubSubService.completeEvent(k));
    }

    private doCreateRxJSPublisher<T extends Message>(publisher: RxJSTopicPublisher<T>): TopicPublisher<T> {
        switch (publisher.eventType) {
            case EventType.DURABLE:
                if (!this._pubSubService['eventObservableMapping'][publisher.topic]) {
                    this._pubSubService.registerEventWithHistory(publisher.topic, this._config.durableEventSize);
                }
                break;
            case EventType.ONLY_LAST:
                if (!this._pubSubService['eventObservableMapping'][publisher.topic]) {
                    this._pubSubService.registerEventWithLastValue(publisher.topic, undefined);
                }
                break;
            default:
                this._pubSubService['createSubjectIfNotExist'](publisher.topic);
        }
        publisher.subject = this._pubSubService['eventObservableMapping'][publisher.topic].ref;

        return publisher;
    }

    private doCreateRxJSSubscriber<T extends Message>(subscriber: RxJSTopicSubscriber<T>): TopicSubscriber<T> {
        switch (subscriber.eventType) {
            case EventType.DURABLE:
                if (!this._pubSubService['eventObservableMapping'][subscriber.topic]) {
                    this._pubSubService.registerEventWithHistory(subscriber.topic, this._config.durableEventSize);
                }
                break;
            case EventType.ONLY_LAST:
                if (!this._pubSubService['eventObservableMapping'][subscriber.topic]) {
                    this._pubSubService.registerEventWithLastValue(subscriber.topic, undefined);
                }
                break;
            default:
                this._pubSubService['createSubjectIfNotExist'](subscriber.topic);
        }

        subscriber.subject = this._pubSubService['eventObservableMapping'][subscriber.topic].ref;
        return subscriber;
    }

    private assertTopicName(topicName: string, type: EventType): void {
        if (!topicName) {
            throw new Error('Topic is not provided!');
        }
        if (!this.topics.has(topicName) || this.topics.get(topicName).eventType !== type) {
            throw new Error(`Incorrect Topic Type. ${topicName}`);
        }

    }


}

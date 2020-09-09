import {
    Channel,
    MessageBus,
    EventType,
    Message,
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


/**
 * Messaging service supports 3 types of events:
 *
 *  - DEFAULT Event:
 *  - Last Value Event:
 *  - History Value Event:
 */
@Injectable({
    providedIn: 'root'
})
export class MessagingService implements MessageBus<Message>, OnDestroy {
    private eventsRegistered: Map<string, EventType> = new Map<string, EventType>();


    constructor(private _config: MessagingConfig, private _pubSubService: NgxPubSubService) {
    }

    createPublisher<T extends Message>(topic: string, type?: EventType): TopicPublisher<T> {
        this.assertTopicName(topic);
        const eventType = type || this._config.eventType;

        if (this._config.channel === Channel.RxJS) {
            const publisher = new RxJSTopicPublisher<T>(topic, eventType);
            return this.doCreateRxJSPublisher(publisher);
        } else {
            return new NativeTopicPublisher(topic, eventType);
        }
        this.eventsRegistered.set(topic, eventType);
    }


    createSubscriber<T extends Message>(topic: string, type?: EventType): TopicSubscriber<T> {
        this.assertTopicName(topic);
        const eventType = type || this._config.eventType;

        if (this._config.channel === Channel.RxJS) {
            const publisher = new RxJSTopicSubscriber<T>(topic, eventType);
            return this.doCreateRxJSSubscriber<T>(publisher);
        } else {
            return new NativeTopicSubscriber(topic, eventType);
        }

        this.eventsRegistered.set(topic, eventType);
    }


    private doCreateRxJSPublisher<T extends Message>(publisher: RxJSTopicPublisher<T>): TopicPublisher<T> {
        switch (publisher.eventType) {
            case EventType.DURABLE:
                this._pubSubService.registerEventWithHistory(publisher.topic, this._config.durableEventSize);
                break;
            case EventType.ONLY_LAST:
                this._pubSubService.registerEventWithLastValue(publisher.topic, undefined);
                break;
            default:
                this._pubSubService['createSubjectIfNotExist'](publisher.topic);
        }
        publisher.subject = this._pubSubService['eventObservableMapping'][publisher.topic].ref;

        return publisher;
    }


    private doCreateRxJSSubscriber<T extends Message>(subscriber: RxJSTopicSubscriber<T>): TopicSubscriber<T> {
        this._pubSubService['createSubjectIfNotExist'](subscriber.topic);
        subscriber.subject = this._pubSubService['eventObservableMapping'][subscriber.topic].ref;
        return subscriber;
    }

    private assertTopicName(topicName: string): void {
        if (!topicName) {
            throw new Error('Topic is not provided!');
        }
    }

    ngOnDestroy(): void {
        this.eventsRegistered.forEach((v, k) => this._pubSubService.completeEvent(k));
    }


}

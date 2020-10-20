import {
    Observable,
    Subject,
    Subscription
} from 'rxjs';


/**
 * Basic interface to implement to have Topic based messaging system. We need to thing if we have one implementation
 * of Publisher/Subscriber or different implementation that take into account security, and other things.
 */
export interface MessageBus<T extends Message> {
    createPublisher(topic: string, type: EventType): TopicPublisher<T>;

    createSubscriber(topic: string, type: EventType, messageSelector?: (msg: Message) => boolean): TopicSubscriber<T>;

    subscribe(topic: string, event: (value: Message) => void,
              messageSelector?: (msg: Message) => boolean): TopicSubscriber<Message>;

    publish(topic: string, message: Message): void;
}


export enum DeliveryModel {
    PERSIST,
    NON_PERSIST,
}

export enum Channel {
    /**
     * Using 3th parth messing library
     */
    RxJS,

    /**
     * window post messaging
     */
    NATIVE,
}

export enum EventType {
    /**
     * Data send will be vanished if no subscriber is found;
     */
    DEFAULT = 1,

    /**
     * Always sends last value if we publish after we subscribe
     */
    ONLY_LAST,

    /**
     * Sends list of values that has be published
     *      - here we also specify the durableEventSize
     */
    DURABLE
}

export class EventTopic {
    topic: string;
    eventType: EventType;
}

export abstract class TopicPublisher<T extends Message> extends EventTopic {
    abstract publish(message: T, deliveryModel?: DeliveryModel): void;
}

export abstract class TopicSubscriber<T extends Message> extends EventTopic {
    abstract onMessage(next?: (value: any) => void, error?: (error: any) => any, complete?: () => void): void;

    abstract asObservable(): Observable<T>;

    abstract unSubscribe(): void;
}


export class RxJSTopicPublisher<T extends Message> implements TopicPublisher<T> {
    subject: Subject<T>;


    constructor(public topic: string, public eventType: EventType) {
    }

    publish(message: T, deliveryModel: DeliveryModel = DeliveryModel.NON_PERSIST): void {
        message.topic = this.topic;
        this.subject.next(message);
    }
}


export class RxJSTopicSubscriber<T extends Message> implements TopicSubscriber<T> {
    subject: Subject<T>;
    private _subscription: Subscription;

    constructor(public topic: string, public eventType: EventType = EventType.DEFAULT,
                public messageSelector?: (msg: Message) => boolean) {
    }


    onMessage(next?: (value: any) => void, error?: (error: any) => any, complete?: () => void): void {
        this._subscription = this.subject.subscribe((value => {
            if (!this.messageSelector || this.messageSelector(value)) {
                next(value);
            }
        }), error, complete);
    }

    asObservable(): Observable<T> {
        return this.subject.asObservable();
    }

    unSubscribe(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}


export class NativeTopicPublisher<T extends Message> implements TopicPublisher<T> {
    targetOrigin: string;

    constructor(public topic: string, public eventType: EventType) {
    }

    /**
     * Probably we will have to pass actual element to get to the contentWindow
     *
     */
    publish(message: T, deliveryModel: DeliveryModel): void {
        window.postMessage(message, this.targetOrigin);
    }
}

export class NativeTopicSubscriber<T extends Message> implements TopicSubscriber<T> {

    constructor(public topic: string, public eventType: EventType) {
    }

    onMessage(next?: (value: any) => void, error?: (error: any) => any, complete?: () => void): void {
        window.addEventListener(this.topic, next);
    }

    asObservable(): Observable<T> {
        return undefined;
    }

    unSubscribe(): void {

    }
}


/**
 * Message Definitions
 */
export abstract class Message {
    id: string;
    timestamp: number;
    priority?: number;
    topic: string;

    constructor(id?: string, timestamp?: number, priority?: number, topic?: string) {
        this.id = id || this.generateUUID();
        this.timestamp = new Date().getTime();
        this.priority = priority || 0;
        this.topic = topic;
    }

    private generateUUID(): string {
        let dt = new Date().getTime();

        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
            (c) => {
                const r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        return uuid;
    }

    toString(): string {
        return `id: ${this.id}, timestamp: ${this.timestamp}, topic: ${this.topic} `;
    }
}

export class TextMessage extends Message {
    constructor(public text: string, topic?: string, id?: string, timestamp?: number, priority?: number) {
        super(id, timestamp, priority, topic);
    }

    toString(): string {
        return `TextMessage {${super.toString()}, text: ${this.text} }`;
    }
}


/**
 * Defines collection based Message
 */
export class MapMessage<T> extends Message {
    private _map: Map<string, T>;

    constructor(topic: string, id?: string, timestamp?: number, priority?: number) {
        super(id, timestamp, priority, topic);
        this._map = new Map<string, T>();
    }

    has(key: string): boolean {
        return this._map.has(key);
    }

    set(key: string, value: T): void {
        this._map.set(key, value);
    }

    get(key: string): T {
        return this._map.get(key);
    }

    toString(): string {
        const messages: string[] = [];
        this._map.forEach((v, k) => {
            messages.push(`${k} : ${v}`);
        });
        return `MapMessage {${super.toString()} ${messages.join()}}`;
    }
}

export class ObjectMessage<T> extends Message {
    constructor(topic: string, id?: string, timestamp?: number, priority?: number) {
        super(id, timestamp, priority, topic);
    }

    private _object: T;

    get object(): T {
        return this._object;
    }

    set object(value: T) {
        this._object = value;
    }

    toString(): string {
        return `ObjectMessage { ${super.toString()}, object: ${this._object.toString()}`;
    }
}



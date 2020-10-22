import { EventType } from '../events/message-bus';
import { Injectable } from '@angular/core';
import {
    TOPIC_APP_EVENT,
    TOPIC_APP_SEARCH,
    TOPIC_ERROR_EVENT,
    TOPIC_SYSTEM_PLUGIN,
    TOPIC_THEME_CHANGE
} from './default-topics';


/**
 * Its important to define topic first, which can set some parameters up front
 */
@Injectable({ providedIn: 'root' })
export class MessagingTopics {
    public topicsDef = new Map<string, Topic>();


    constructor() {
        // default topics
        this.define({ name: TOPIC_THEME_CHANGE, eventType: EventType.ONLY_LAST, shared: true });
        this.define({ name: TOPIC_APP_EVENT, eventType: EventType.ONLY_LAST, shared: true });
        this.define({ name: TOPIC_APP_SEARCH, eventType: EventType.ONLY_LAST, shared: true });
        this.define({ name: TOPIC_SYSTEM_PLUGIN, eventType: EventType.DEFAULT, shared: true });
        this.define({ name: TOPIC_ERROR_EVENT, eventType: EventType.DURABLE, shared: true });
    }

    define(topic: Topic): void {
        if (this.topicsDef.has(topic.name)) {
            return;
        }
        this.topicsDef.set(topic.name, topic);
    }

    has(name: string): boolean {
        return this.topicsDef.has(name);
    }

    /**
     * If we dont find exact mach then go up to category
     *
     */
    get(name: string): Topic {
        if (this.topicsDef.has(name)) {
            return this.topicsDef.get(name);
        }

        return this.topicsDef.entries().next().value;
    }
}


export interface Topic {
    name: string;
    eventType: EventType;
    durableEventSize?: number;

    /**
     * Is this topic internal and only private to AppShell API
     */
    shared: boolean;
}

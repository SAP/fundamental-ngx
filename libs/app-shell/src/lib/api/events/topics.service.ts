import { EventType } from '../events/message-bus';
import { Injectable } from '@angular/core';


/**
 * Its important to define topic first, which can set some parameters up front
 */
@Injectable({ providedIn: 'root' })
export class MessagingTopics {
    public topicsDef = new Map<string, Topic>();

    set(topic: Topic): void {
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

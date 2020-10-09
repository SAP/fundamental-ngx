import { EventType } from '../events/message-bus';
import { Injectable } from '@angular/core';


/**
 * Its important to define topic first, which can set some parameters up front
 */
@Injectable()
export class MessagingTopics {
    public topicsDef: Array<Topic> = [];

    constructor() {

    }

    defineTopic(topic: Topic): void {
        const length = this.topicsDef.filter((t) => t.name === topic.name).length;
        if (length === 0) {
            this.topicsDef.push(topic);
        }
    }

    hasTopic(name: string): boolean {
        return this.topicsDef.filter((t) => t.name === name).length > 0;
    }

    /**
     * If we dont find exact mach then go up to category
     *
     */
    getTopic(name: string): Topic {
        const topics = this.topicsDef.filter((t) => t.name === name);
        return topics[0];
    }
}


export interface Topic {
    prefix: string;
    eventType: EventType;
    name: string;
    durableEventSize?: number;

    /**
     * Is this topic internal and only private to AppShell API
     */
    shared: boolean;
}

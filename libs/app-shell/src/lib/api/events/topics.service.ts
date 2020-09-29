import { EventType } from '../events/message-bus';
import { Injectable } from '@angular/core';

@Injectable()
export class MessagingTopics {
    public topicsDef: Array<Topic> = [];

    constructor() {

    }

    addTopic(topic: Topic): void {
        const length = this.topicsDef.filter((t) => t.name === topic.name).length;
        if (length === 0) {
            this.topicsDef.push(topic);
        }
    }

    hasTopic(name: string): boolean {
        return this.topicsDef.filter((t) => t.name === name).length > 0;
    }

    getTopic(name: string): Topic {
        return this.topicsDef.filter((t) => t.name === name)[0];
    }
}


export interface Topic {
    prefix: string;
    eventType: EventType;
    name: string;

    /**
     * Is this topic internal and only private to AppShell API
     */
    shared: boolean;
}

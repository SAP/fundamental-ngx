import {
    EventType,
    MapMessage
} from '../events/message-bus';
import { Injectable } from '@angular/core';
import { MessagingService } from '../events/messaging.service';
import { MessagingTopics } from '../../api/events/topics.service';

const TOPIC_THEME_CHANGE = 'theme:change';


/**
 * Todo: Do we need this extra service? instead of using message bus directly? But always some client is helpfulll.
 */
@Injectable({ providedIn: 'root' })
export class ThemeManagerService {

    constructor(private messageBus: MessagingService, private topics: MessagingTopics) {
        this.topics.defineTopic({
            prefix: 'theme:',
            name: TOPIC_THEME_CHANGE,
            eventType: EventType.ONLY_LAST,
            shared: true
        });
    }

    themeChanged(id: string, name: string): void {
        const mapMessage = new MapMessage<string>(TOPIC_THEME_CHANGE);
        mapMessage.set('name', name);
        mapMessage.set('id', id);

        this.messageBus.publish(TOPIC_THEME_CHANGE, mapMessage);
    }

    /**
     *
     * Todo: Its behavior subjects so first value that is send it undefiend. we can probably wrap this
     * with observer and pipe it tp skip NULL
     *
     */
    onChange(next?: (value: any) => void): void {
        this.messageBus.subscribe(TOPIC_THEME_CHANGE, next);
    }

}

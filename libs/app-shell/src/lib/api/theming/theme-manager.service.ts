import {
    EventType,
    MapMessage,
    TopicPublisher,
    TopicSubscriber
} from '../events/event-bus';
import {
    Injectable,
    OnDestroy
} from '@angular/core';
import { MessagingService } from '../events/messaging.service';

const TOPIC_THEME_CHANGE = 'theme:change';

@Injectable({
    providedIn: 'root'
})
export class ThemeManagerService implements OnDestroy {

    private publisher: TopicPublisher<MapMessage<string>>;
    private subscriber: TopicSubscriber<MapMessage<string>>;

    constructor(private messagingService: MessagingService) {
        // we always want to get last set value
        this.publisher = this.messagingService.createPublisher<MapMessage<string>>(TOPIC_THEME_CHANGE,
            EventType.ONLY_LAST);

        this.subscriber = this.messagingService.createSubscriber<MapMessage<string>>(TOPIC_THEME_CHANGE,
            EventType.ONLY_LAST);

        console.log('Theme Manager read', this.subscriber)

    }

    themeChanged(id: string, name: string): void {
        const mapMessage = new MapMessage<string>(TOPIC_THEME_CHANGE);
        mapMessage.set('name', name);
        mapMessage.set('id', id);

        this.publisher.publish(mapMessage);
    }

    /**
     *
     * Todo: Its behavior subjects so first value that is send it undefiend. we can probably wrap this
     * with observer and pipe it tp skip NULL
     *
     */
    onChange(next?: (value: any) => void, error?: (error: any) => any, complete?: () => void): void {
        this.subscriber.onMessage(next);
    }

    ngOnDestroy(): void {
        this.subscriber.unSubscribe();
    }

}

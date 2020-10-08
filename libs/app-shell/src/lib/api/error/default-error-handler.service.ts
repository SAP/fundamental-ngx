import {
    ErrorHandler,
    Inject,
    Injectable,
    OnDestroy
} from '@angular/core';
import {
    EventType,
    Message,
    TopicSubscriber
} from '../events/message-bus';
import { MessagingTopics } from '../events/topics.service';
import { MessagingService } from '../events/messaging.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
    ERROR_FORMATTER,
    ErrorFormatter
} from './error-formatter';
import {
    ERROR_NOTIFIERS,
    ErrorNotifier
} from './error-notifier';

const TOPIC_ERROR_EVENT = 'error:event';


@Injectable()
export class DefaultErrorHandlerService implements ErrorHandler, OnDestroy {
    private subscriber: TopicSubscriber<Message>;

    constructor(private messagingService: MessagingService,
                private topics: MessagingTopics,
                @Inject(ERROR_FORMATTER) private formatter: ErrorFormatter,
                @Inject(ERROR_NOTIFIERS) private notifiers: ErrorNotifier[]) {

        this.topics.defineTopic({
            prefix: 'error:', eventType: EventType.DURABLE,
            name: TOPIC_ERROR_EVENT, shared: true
        });

        this.initializeMessagingErrors();
    }

    handleError(error: Message | string | Error | HttpErrorResponse): void {
        const errorMessage = this.formatter.format(error);
        this.notifiers.forEach(notifer => notifer.notify(errorMessage));
    }


    private initializeMessagingErrors(): void {
        this.subscriber = this.messagingService.createSubscriber(TOPIC_ERROR_EVENT, EventType.DURABLE);
        this.subscriber.onMessage((m: Message) => {
            this.handleError(m)
        });
    }


    ngOnDestroy(): void {
        this.subscriber.unSubscribe();
    }
}

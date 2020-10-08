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


/**
 * AppShell Error Managements extends Angular errors to work with the message bus as well as offer unified way to
 * consume errors.
 *
 * Since DefaultErrorHandlerService is Angular's ErrorHandler listening for all errors happening in the Angular it
 * offers two ways for application developer to extend this.
 *
 * provider: ERROR_FORMATTER => Since we are dealing with different types of Messages we can implement ErrorFormatter
 * to take various types and return its string representation
 *
 *
 * provider: ERROR_NOTIFIERS => To consume errors we have default and simple implementation ConsoleErrorNotifier,
 * which just logs error messages to console. Application can extend this and provider list of Notifiers to
 * perform different actions ( e.g.: Console Notifier, UIMessageNotifier that could show dialog about the error,
 * AppShell notifier to send messages outside of Ariba application to the global SAP.
 */
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
            this.handleError(m);
        });
    }


    ngOnDestroy(): void {
        this.subscriber.unSubscribe();
    }
}

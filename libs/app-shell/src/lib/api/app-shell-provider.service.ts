import {
    Injectable,
    NgZone
} from '@angular/core';
import { ThemeManagerService } from './theming/theme-manager.service';
import { ShellBarService } from './extensions/shell-bar.service';
import { MessagingTopics } from './events/topics.service';
import { EventType } from './events/message-bus';
import { MessagingService } from './events/messaging.service';

@Injectable()
export class AppShellProviderService {

    constructor(private ngZone: NgZone,
                private topics: MessagingTopics,
                public themeManager: ThemeManagerService,
                public messageBus: MessagingService,
                public shellBar?: ShellBarService
    ) {
        /**
         * Create AppShell Level topics
         */
        this.topics.defineTopic({
            prefix: 'app:', eventType: EventType.ONLY_LAST, name: 'app:event',
            shared: true
        });
        this.topics.defineTopic({
            prefix: 'app:', eventType: EventType.ONLY_LAST, name: 'app:search',
            shared: true
        });

        /**
         * We could also create different web workers  that can communicate with each other, but
         * as starter Window should work
         */
        window['appShellProvider'] = { ref: this, zone: ngZone };
    }
}



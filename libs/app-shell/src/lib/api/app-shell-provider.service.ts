import {
    Injectable,
    NgZone
} from '@angular/core';
import { ThemeManagerService } from './theming/theme-manager.service';
import { ShellBarService } from './extensions/shell-bar.service';
import { MessagingTopics } from './events/topics.service';
import { EventType } from './events/message-bus';
import { MessagingService } from './events/messaging.service';

@Injectable({ providedIn: 'root' })
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
        // todo_valorkin
        this.topics.define({
            name: 'app:event',
            eventType: EventType.ONLY_LAST,
            shared: true
        });
        this.topics.define({
            name: 'app:search',
            eventType: EventType.ONLY_LAST,
            shared: true
        });

        /**
         * We could also create different web workers  that can communicate with each other, but
         * as starter Window should work
         */
        window['appShellProvider'] = { ref: this, zone: ngZone };
    }
}



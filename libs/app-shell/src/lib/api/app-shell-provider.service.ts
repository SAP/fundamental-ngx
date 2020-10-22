import {
    Injectable,
    NgZone
} from '@angular/core';
import { ThemeManagerService } from './theming/theme-manager.service';
import { ShellBarService } from './plugins/shell-bar.service';
import { MessagingTopics } from './events/topics.service';
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
         * We could also create different web workers  that can communicate with each other, but
         * as starter Window should work
         */
        window['appShellProvider'] = { ref: this, zone: ngZone };
    }
}



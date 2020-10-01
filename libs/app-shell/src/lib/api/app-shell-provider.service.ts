import {
    Injectable,
    NgZone
} from '@angular/core';
import { ThemeManagerService } from './theming/theme-manager.service';
import { ShellBarService } from './extensions/shell-bar.service';
import { MessagingTopics } from './events/topics.service';
import {
    EventType,
    Message,
    TopicPublisher,
    TopicSubscriber
} from './events/message-bus';
import { PluginManagerService } from './extensions/plugin-manager.service';
import { PluginContext } from './extensions/component/plugin-component';

@Injectable()
export class AppShellProviderService {
    pluginContext: PluginContext;

    constructor(private ngZone: NgZone,
                private _pMgr: PluginManagerService,
                public topics: MessagingTopics,
                public themeManager: ThemeManagerService,
                public shellBar?: ShellBarService
    ) {
        /**
         * Create AppShell Level topics
         */
        this.topics.addTopic({
            prefix: 'app:', eventType: EventType.ONLY_LAST, name: 'app:event',
            shared: true
        });
        this.topics.addTopic({
            prefix: 'app:', eventType: EventType.ONLY_LAST, name: 'app:search',
            shared: true
        });
        this.pluginContext = this._pMgr.createPluginContext(true);

        /**
         * We could also create different web workers  that can communicate with each other, but
         * as starter Window should work
         */
        window['appShellProvider'] = { ref: this, zone: ngZone };
    }


    subscriber(topic: string): TopicSubscriber<Message> {
        return this.pluginContext.subscriber(topic);
    }

    publisher(topic: string): TopicPublisher<Message> {
        return this.pluginContext.publisher(topic);
    }
}



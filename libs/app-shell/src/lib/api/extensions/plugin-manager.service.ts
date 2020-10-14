import {
    Injectable,
    OnDestroy
} from '@angular/core';
import { LookupService } from './lookup/lookup.service';
import {
    PluginComponent,
    PluginContext
} from './component/plugin-component';
import { MessagingService } from '../../api/events/messaging.service';
import {
    Listener,
    PluginConfiguration
} from './component/plugin-configuration.model';
import { PluginDescriptor } from './lookup/plugin-descriptor.model';
import {
    EventType,
    MapMessage,
    Message,
    TopicSubscriber
} from '../events/message-bus';
import { MessagingTopics } from '../../api/events/topics.service';

const TOPIC_SYSTEM_PLUGIN = 'system:plugin';

/**
 * Plugin is our AppShell Extensions
 * -------------------------------
 *
 *
 * MF Federation Flow 1:
 * ---------------------
 *  Initial Idea was to have decentralized Lookup Microservices, where teams would register their services (with lease)
 *  and there would be a process discovery to retrieve these configurations and only then we could perform lookup
 *  procedure. For simplicity now it is going to work as:
 *
 *  1. Plugin Manager is going to be used by AppShell (Application) to load required configuration in format of
 *    PluginDescriptor[]
 *
 *  2. Each Entry (PluginDescriptor) is going to be registered into LookupService.pluginsRepository.
 *
 *  ---------- This is our simplified Discovery process)
 *
 *  3. In the event Component of creation (either we use PluginLauncherComponent or we load whole module), we are
 *  going to register current AppShell Extensions (plugin)
 *   - When using PluginLauncherComponent, based on its @Input(s) it will perform lookup to retrieve requested plugin
 *      Then we are going to use federation-utils to bootstrap this plugin and to get a type.
 *          => here we broadcast event "extension:registering" using msg-bus.
 *          => we listen for this event inside PluginManager to execute registration process
 *              -> Call initialize?(with Context)
 *              -> Ask for necessary PluginConfiguration and process it
 *   - When dealing with Module, the process should be similar
 *
 *   """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
 *   We assume that Entry Component of the Remote implements PluginComponent interface so we can properly initialize it
 *   """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
 *
 *  4. Add it to the page either directly using ComponentFactoryResolver and ContainerViewRef or using Module (Router)
 *
 *
 * MF Federation Flow 2:
 * ---------------------
 *
 * Local environment we we dont load component or instantiate using ComponentFactoryResolver! This is more for testing
 * now.
 *
 *  - We need to have access to Plugin Manager
 *  - We need to have access to AppShell Provider? and this provides PLuginManager?
 *
 *  For now I simple inject pluginManager into the component for local testing and register current component as plugin??
 *
 *
 *
 *
 * todo: Maybe create some factory to make the Topic Message easier.
 */
@Injectable({ providedIn: 'root' })
export class PluginManagerService implements OnDestroy {
    private registry: Map<string, RegistrationEntry> = new Map<string, RegistrationEntry>();

    constructor(private lookupService: LookupService, private messageBus: MessagingService,
                private topics: MessagingTopics) {
        this.topics.set({
            name: TOPIC_SYSTEM_PLUGIN,
            eventType: EventType.DEFAULT,
            shared: true
        });
    }

    loadConfiguration(plugins: Array<Partial<PluginDescriptor>>): void {
        this.messageBus.publish(TOPIC_SYSTEM_PLUGIN, createMessage('configuration', 'start'));

        plugins.forEach(c => this.lookupService.addPlugin(c));

        this.messageBus.publish(TOPIC_SYSTEM_PLUGIN, createMessage('configuration', 'end'));
    }

    /**
     * Todo: Right now we create subscribers but we dont release them right away but leave this up to the MessageBus to
     * clean up everything. Should check when registering a plugin if we already did subscription for it and do clean
     * up before continuing
     *
     */
    register(descriptor: Partial<PluginDescriptor>, pluginComponent?: PluginComponent): void {
        // todo: this can be undefined too .getName()
        const name = descriptor ? descriptor.name : pluginComponent.getConfiguration().getName();

        this.messageBus.publish(TOPIC_SYSTEM_PLUGIN, createMessage('register', 'start', name));

        let configuration: Partial<PluginConfiguration>;
        if (pluginComponent) {
            configuration = pluginComponent.getConfiguration();
            this.doConfigureListeners(configuration, pluginComponent);

            const pluginContext = this.createPluginContext();
            pluginComponent.initialize(pluginContext);
        }
        this.registry.set(name, new RegistrationEntry(descriptor, configuration, pluginComponent));
        this.messageBus.publish(TOPIC_SYSTEM_PLUGIN, createMessage('register', 'end', name));
    }


    ngOnDestroy(): void {
        // todo: do proper cleanup of subscribers also here.
        this.registry.clear();
    }

    createPluginContext(): PluginContext {
        return new PluginContext(this.messageBus);
    }


    private doConfigureListeners(configuration: Partial<PluginConfiguration>,
                                 pluginComponent?: PluginComponent): void {
        if (!configuration.addListeners || configuration.addListeners().length === 0) {
            return;
        }
        configuration.addListeners().forEach((listener: Listener) => {
            if (this.topics.has(listener.topic)) {
                const topic = this.topics.get(listener.topic);
                this.messageBus.subscribe(topic.name, (m) => listener.onMessage(m),
                    listener.messageSelector);
            }
        });
    }

}

function createMessage(type: string, status: string, pluginName?: string): MapMessage<string> {
    const m = new MapMessage<string>(TOPIC_SYSTEM_PLUGIN);
    m.set('type', type);
    m.set('status', status);

    if (pluginName) {
        m.set('pluginName', pluginName);
    }
    return m;
}

export class RegistrationEntry {
    constructor(public descriptor: Partial<PluginDescriptor>, public configuration: Partial<PluginConfiguration>,
                public pluginComponent: PluginComponent, public subscribers?: Array<TopicSubscriber<Message>>) {
    }
}

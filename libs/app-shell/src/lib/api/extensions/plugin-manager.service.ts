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
    TopicPublisher,
    TopicSubscriber
} from '../events/message-bus';
import {
    MessagingTopics,
    Topic
} from '../../api/events/topics.service';

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
@Injectable()
export class PluginManagerService implements OnDestroy {
    private registry: Map<string, RegistrationEntry> = new Map<string, RegistrationEntry>();
    private pluginTopic: TopicPublisher<MapMessage<string>>;

    constructor(private lookupService: LookupService, private messageBus: MessagingService,
                private topics: MessagingTopics) {
        this.topics.addTopic({
            prefix: 'system:', eventType: EventType.DEFAULT, name: TOPIC_SYSTEM_PLUGIN,
            shared: true
        });
        this.pluginTopic = this.messageBus.createPublisher<MapMessage<string>>(TOPIC_SYSTEM_PLUGIN, EventType.DEFAULT);
    }

    loadConfiguration(plugins: Array<Partial<PluginDescriptor>>): void {
        const m = new MapMessage<string>(TOPIC_SYSTEM_PLUGIN);
        m.set('type', 'configuration');
        m.set('status', 'start');
        this.pluginTopic.publish(m);
        plugins.forEach(c => this.lookupService.addPlugin(c));

        m.set('type', 'configuration');
        m.set('type', 'end');
        this.pluginTopic.publish(m);
    }

    register(descriptor: Partial<PluginDescriptor>, pluginComponent?: PluginComponent): void {
        // todo: this can be undefined too .getName()
        const name = descriptor ? descriptor.name : pluginComponent.getConfiguration().getName();
        if (this.registry.has(name)) {
            // we should probably clean up also possible listeners
            const entry = this.registry.get(name);
            if (entry.subscribers) {
                entry.subscribers.forEach(subscriber => {
                    subscriber.unSubscribe();
                });
            }
            this.registry.delete(name);
        }

        const m = new MapMessage<string>(TOPIC_SYSTEM_PLUGIN);
        m.set('type', 'register');
        m.set('status', 'start');
        m.set('pluginName', descriptor?.name || pluginComponent?.getConfiguration().getName());
        let configuration: Partial<PluginConfiguration>;

        if (pluginComponent) {
            configuration = pluginComponent.getConfiguration();
            const listeners = this.doConfigureListeners(configuration, pluginComponent);

            // as part of communication strategies pass only things that are needed.
            const pluginContext = this.createPluginContext();
            pluginComponent.initialize(pluginContext);
            this.registry.set(name, new RegistrationEntry(descriptor, configuration, pluginComponent, listeners));
        } else {
            this.registry.set(name, new RegistrationEntry(descriptor, configuration, pluginComponent));
        }
        m.set('type', 'register');
        m.set('status', 'end');
        m.set('pluginName', descriptor?.name || pluginComponent?.getConfiguration().getName());
    }


    ngOnDestroy(): void {
        // todo: do proper cleanup of subscribers also here. 
        this.registry.clear();
    }

    createPluginContext(all: boolean = false): PluginContext {
        const publishers = new Map<string, TopicPublisher<Message>>();
        this.topics.topicsDef.forEach((t: Topic) => {
            if (t.shared) {
                publishers.set(t.name, this.messageBus.createPublisher(t.name, t.eventType));
            }
        });

        const subscribers = new Map<string, TopicSubscriber<Message>>();
        if (all) {
            this.topics.topicsDef.forEach((t: Topic) => {
                if (t.shared) {
                    const subscriber = this.messageBus.createSubscriber(t.name, t.eventType);
                    subscribers.set(t.name, subscriber);
                }
            });
        }
        const context = new PluginContext(publishers, subscribers);
        return context;
    }


    private doConfigureListeners(configuration: Partial<PluginConfiguration>,
                                 pluginComponent?: PluginComponent): Array<TopicSubscriber<Message>> {
        if (!configuration.addListeners || configuration.addListeners().length === 0) {
            return;
        }
        const subscribers = [];
        configuration.addListeners().forEach((listener: Listener) => {
            if (this.topics.hasTopic(listener.topic)) {
                const topic = this.topics.getTopic(listener.topic);
                const subscriber = this.messageBus.createSubscriber(listener.topic, topic.eventType,
                    listener.messageSelector);

                subscriber.onMessage((m: Message) => {
                    if (pluginComponent) {
                        //  since we are wrapping rxjs we need to also pass THIS to current callback
                        listener.onMessage.call(pluginComponent, m);
                    } else {
                        listener.onMessage(m);
                    }
                });
                subscribers.push(subscriber);
            }
        });
        return subscribers;
    }
}

export class RegistrationEntry {
    constructor(public descriptor: Partial<PluginDescriptor>, public configuration: Partial<PluginConfiguration>,
                public pluginComponent: PluginComponent, public subscribers?: Array<TopicSubscriber<Message>>) {
    }
}

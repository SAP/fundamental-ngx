import {
    Injectable,
    OnDestroy
} from '@angular/core';
import { LookupService } from './lookup/lookup.service';

import { MessagingService } from '../../api/events/messaging.service';
import { PluginDescriptor } from './lookup/plugin-descriptor.model';
import { MapMessage } from '../events/message-bus';
import { MessagingTopics } from '../../api/events/topics.service';
import { TOPIC_SYSTEM_PLUGIN } from '../../api/events/default-topics';

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
    }

    loadConfiguration(plugins: Array<Partial<PluginDescriptor>>): void {
        this.messageBus.publish(TOPIC_SYSTEM_PLUGIN, createMessage('configuration', 'start'));
        plugins.forEach(c => this.lookupService.addPlugin(c));
        this.messageBus.publish(TOPIC_SYSTEM_PLUGIN, createMessage('configuration', 'end'));
    }


    register(descriptor: Partial<PluginDescriptor>): void {
        this.messageBus.publish(TOPIC_SYSTEM_PLUGIN, createMessage('register', 'start', name));
        this.registry.set(descriptor.name, new RegistrationEntry(descriptor));
        this.messageBus.publish(TOPIC_SYSTEM_PLUGIN, createMessage('register', 'end', name));
    }


    ngOnDestroy(): void {
        // todo: do proper cleanup of subscribers also here.
        this.registry.clear();
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
    timestamp: number;

    constructor(public descriptor: Partial<PluginDescriptor>) {
        this.timestamp = Date.now();
    }
}

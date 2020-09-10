import { Injectable } from '@angular/core';
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
import { ThemeTopics } from '../theming/topic.model';
import { PluginDescriptor } from './lookup/plugin-descriptor.model';
import { Message } from '../events/message-bus';


/**
 * Plugin is our AppShell Extensions
 * -------------------------------
 *
 *
 * MF Federation Flow 1:
 * ---------------------
 *  Initial Idea was to have decentralized Lookup Microservices, where teams would register their services (with lease)
 *  and there would be a process discovery to retrieve these configuration and only then we could perform lookup
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
 *
 */
@Injectable({
    providedIn: 'root'
})
export class PluginManagerService {
    private registry: Map<string, RegistrationEntry> = new Map<string, RegistrationEntry>();

    constructor(private lookupService: LookupService, private messageBus: MessagingService) {
    }

    loadConfiguration(url: string): void {

    }


    register(plugin: PluginComponent, descriptor: Partial<PluginDescriptor>): void {
        const configuration = plugin.getConfiguration();
        this.doConfigureTheming(configuration);

        const context = new PluginContext(new Map());
        plugin.initialize(context);

        this.registry.set(descriptor.id, new RegistrationEntry(descriptor, configuration, plugin));


    }


    unRegister(plugin: PluginComponent, descriptor: PluginDescriptor): void {

    }

    private doConfigureTheming(configuration: Partial<PluginConfiguration>): void {
        console.log('doConfigureTheming')
        if (!configuration.getPermission().themingChange || configuration.addListeners().length === 0) {
            return;
        }


        configuration.addListeners().forEach((listener: Listener) => {
            if (listener.topic.includes(ThemeTopics.Prefix)) {
                const subscriber = this.messageBus.createSubscriber(listener.topic, ThemeTopics.EventType);
                subscriber.onMessage((m: Message) => {
                    listener.onMessage(m);
                });
            }
        });
    }
}

export class RegistrationEntry {
    constructor(public descriptor: Partial<PluginDescriptor>, public configuration: Partial<PluginConfiguration>,
                public pluginComponent: PluginComponent) {
    }
}

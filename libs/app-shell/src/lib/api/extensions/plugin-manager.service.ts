import { Injectable } from '@angular/core';
import { LookupService } from './lookup/lookup.service';
import { PluginComponent } from './component/plugin-component';


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
 *   - When using PluginLauncherComponent, based on @Inputs() it will perform lookups to retrieve requested plugin
 *      Then we are going to use federation-utils to bootstrap this plugin and to get a type.
 *          => here we broadcast event "extension:registering" using msg-bus we listen for this event inside
 *          PluginManager to execute registration process
 *              -> Call initialize?(with Context)
 *              -> Ask for necessary PluginConfiguration and process it
 *
 *  4. Add it to the page either directly using ComponentFactoryResolver and ContainerViewRef or using Module (Router)
 *
 *
 * MF Federation Flow 2:
 * ---------------------
 *
 * Local environment we we dont load component or instantiate using ComponentFactoryResolver!
 *
 *
 *
 */
@Injectable({
    providedIn: 'root'
})
export class PluginManagerService {

    constructor(private lookupService: LookupService) {
    }

    loadConfiguration(url: string): void {

    }


    register(plugin: PluginComponent): void {
        this.register();
    }


    unRegister(plugin: PluginComponent): void {

    }
}

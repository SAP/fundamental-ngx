/**
 *
 * Depending on the configuration scope component can be initialized at different times:
 *  - Global Scope Level (Application)
 *  - Page Scope Level (Widgets)
 *
 *  We are talking about dealing with both component and modules. If there is some routing to be registered with main
 *  router it could be defined as Application scope
 */
import { PluginConfiguration } from './plugin-configuration.model';
import { MessagingService } from '../../../..';


export interface PluginComponent {
    initialize(context: PluginContext): void;

    getConfiguration(): Partial<PluginConfiguration>;

}

export class PluginContext {

    constructor(public messaging: MessagingService) {
    }

}


export function isPluginComponent(cmp: PluginComponent): cmp is PluginComponent {
    const pluginComponentType = cmp as PluginComponent;
    return pluginComponentType.initialize !== undefined &&
        pluginComponentType.getConfiguration !== undefined;
}

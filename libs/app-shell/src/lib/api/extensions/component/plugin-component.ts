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
import { TopicPublisher } from '../../events/message-bus';


export interface PluginComponent {
    initialize(context: PluginContext): void;

    configure(): Partial<PluginConfiguration>;
}

export class PluginContext {
    /**
     * I think we want to pass only specific set of services not everything. so we can have some getters, or map
     * and add only service that we want plugin to have.
     *
     * Do we want to pass services at all?
     *
     * Please see Configuration => Lister, what if we provide here only a list of publishers
     * not really whole service.
     *
     * Map <TOPIC, TopicPublisher> ??
     *
     * Plus maybe inject some other services
     */
    constructor(public messageBuss: Map<string, TopicPublisher<any>>) {
    }
}

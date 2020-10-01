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
import {
    Message,
    TopicPublisher,
    TopicSubscriber
} from '../../events/message-bus';


export interface PluginComponent {
    initialize(context: PluginContext): void;

    getConfiguration(): Partial<PluginConfiguration>;

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
    constructor(private messageBusPub: Map<string, TopicPublisher<Message>>,
                private messageBusSub?: Map<string, TopicSubscriber<Message>>) {
    }


    subscriber(topic: string): TopicSubscriber<Message> {
        if (!this.messageBusSub.has(topic)) {
            throw new Error('Invalid topic name');
        }
        return this.messageBusSub.get(topic);
    }

    publisher(topic: string): TopicPublisher<Message> {
        if (!this.messageBusPub.has(topic)) {
            throw new Error('Invalid topic name');
        }
        return this.messageBusPub.get(topic);
    }
}


export function isPluginComponent(cmp: PluginComponent): cmp is PluginComponent {
    const pluginComponentType = cmp as PluginComponent;
    return pluginComponentType.initialize !== undefined &&
        pluginComponentType.getConfiguration !== undefined;
}

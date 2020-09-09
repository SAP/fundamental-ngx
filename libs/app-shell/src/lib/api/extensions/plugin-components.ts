import { PluginConfiguration } from './plugin-definition.model';
import { TopicPublisher } from '../events/message-bus';


/**
 * Application Level component/ module are those that are bootstrap at
 * App-Shell Initialization process.
 *
 * Application should provide such component if it wants to publish something to global scope.
 *
 * todo: Differentiate these interfaces so I can create type guard to check it implement Interface A or B
 */
export interface ApplicationComponent {
    initialize(context: PluginContext): void;

    configure(): PluginConfiguration;
}


/**
 * Its Page-level scope  and this component / Module is initialized when a specific plugin is added to the page.
 *
 */
export interface PageComponent {
    initialize(context: PluginContext): void;

    configure(): PluginConfiguration;
}

export class PluginContext {
    /**
     * I think we want to pass only specific set of services not everything. so we can have some getters, or map
     * and add only service that we want plugin to have.
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

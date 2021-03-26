import { BaseEntity } from './entity';
import { ChainingPolicy } from './chaining-policy';

export interface EntityMetaOptions<Entity extends BaseEntity = BaseEntity> {
    // Entity Name. It must be unique
    name: string;
    // Entity Primary Key
    primaryKey?: string;
    // Domain
    domain?: string;
    // Domain this entity belongs to
    aggregateOf?: string;
    // Request Chaining Strategy
    chainingPolicy?: ChainingPolicy<Entity>;
}

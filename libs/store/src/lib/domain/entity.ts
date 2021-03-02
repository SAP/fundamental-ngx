export type IdentityKey = string | number;

export abstract class Entity {
    id: IdentityKey;
}

export interface EntityMetaOptions {
    // Entity Name. It must be unique
    name: string;
    // Entity Primary Key
    primaryKey?: string;
    // Domain
    domain?: string;
    // Domain this entity belongs to
    aggregateOf?: string;
}

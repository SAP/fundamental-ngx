import 'reflect-metadata';

import { BaseEntity } from './entity';
import { EntityMetaOptions } from './entity-meta-options';
import { EntityResourceMetaOptions } from './rest-resource';
import { Type } from './utility';

export const ENTITY_KEY = Symbol('ENTITY');
export const REST_RESOURCE_KEY = Symbol('REST_Resource');

const entitiesSet = new Set();

export type EntityType<T extends BaseEntity> = Type<T>;

export function Entity<T extends BaseEntity>(config: EntityMetaOptions<T>) {
    // TODO: Add entity name uniqueness validation
    return (target: EntityType<T>) => {
        if (!entitiesSet.has(target)) {
            entitiesSet.add(target);
        }
        Reflect.defineMetadata(ENTITY_KEY, config, target);
    };
}

export function RESTResource<T extends BaseEntity>(config: EntityResourceMetaOptions) {
    return (target: EntityType<T>) => {
        if (!entitiesSet.has(target)) {
            entitiesSet.add(target);
        }
        Reflect.defineMetadata(REST_RESOURCE_KEY, config, target);
    };
}

export function getEntityMetadata<T extends BaseEntity>(target: EntityType<T>): EntityMetaOptions<T> | undefined {
    return Reflect.getOwnMetadata(ENTITY_KEY, target);
}

export function getResourceMetadata<T extends BaseEntity>(target: EntityType<T>): EntityResourceMetaOptions | undefined {
    return Reflect.getOwnMetadata(REST_RESOURCE_KEY, target);
}

export function getEntityMetadataByEntityName(entityName: string): EntityMetaOptions | undefined {
    const entity: EntityType<any> = getEntityByName(entityName);
    if (entity) {
        return getEntityMetadata(entity);
    }
    return undefined;
}

export function getEntityResourceMetadataByEntityName(entityName: string): EntityResourceMetaOptions | undefined {
    const entity: EntityType<any> = getEntityByName(entityName);
    if (entity) {
        return getResourceMetadata(entity);
    }
    return undefined;
}

const getEntityByName = (entityName: string) => {
    for (const target of Array.from(entitiesSet)) {
        const options = getEntityMetadata(target as EntityType<any>);
        if (options.name === entityName) {
            return target as EntityType<any>;
        }
    }
};

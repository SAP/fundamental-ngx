import 'reflect-metadata';

import { EntityMetaOptions } from './entity';
import { EntityResourceMetaOptions } from './rest-resource';

export const ENTITY_KEY = Symbol('ENTITY');
export const REST_RESOURCE_KEY = Symbol('REST_Resource');

const entitiesSet = new Set();

export type Type<T> = new (...args: any[]) => T;

export function Entity(config: EntityMetaOptions) {
    // TODO: Add entity name uniqueness validation
    return <T>(target: Type<T>) => {
        if (!entitiesSet.has(target)) {
            entitiesSet.add(target);
        }
        Reflect.defineMetadata(ENTITY_KEY, config, target);
    };
}

export function RESTResource(config: EntityResourceMetaOptions) {
    return <T>(target: Type<T>) => {
        if (!entitiesSet.has(target)) {
            entitiesSet.add(target);
        }
        Reflect.defineMetadata(REST_RESOURCE_KEY, config, target);
    };
}

export function getEntityMetadata<T>(target: Type<T>): EntityMetaOptions | undefined {
    return Reflect.getOwnMetadata(ENTITY_KEY, target);
}

export function getResourceMetadata<T>(target: Type<T>): EntityResourceMetaOptions | undefined {
    return Reflect.getOwnMetadata(REST_RESOURCE_KEY, target);
}

export function getEntityMetadataByEntityName(entityName: string): EntityMetaOptions | undefined {
    const entity: Type<any> = getEntityByName(entityName);
    if (entity) {
        return getEntityMetadata(entity);
    }
    return undefined;
}

export function getEntityResourceMetadataByEntityName(entityName: string): EntityResourceMetaOptions | undefined {
    const entity: Type<any> = getEntityByName(entityName);
    if (entity) {
        return getResourceMetadata(entity);
    }
    return undefined;
}

const getEntityByName = (entityName: string) => {
    for (const target of Array.from(entitiesSet)) {
        const options = getEntityMetadata(target as Type<any>);
        if (options.name === entityName) {
            return target as Type<any>;
        }
    }
};

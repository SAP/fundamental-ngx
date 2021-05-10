import { EntityMetaOptions } from './entity-meta-options';
import { EntityResourceMetaOptions } from './rest-resource';
import { Type } from './utility';

export const ENTITY_KEY = Symbol('ENTITY');
export const REST_RESOURCE_KEY = Symbol('REST_Resource');

const ENTITY_META_MAP = new Map<Type<any>, EntityMetaOptions<any>>();
const RESOURCE_MAP = new Map<Type<any>, EntityResourceMetaOptions>();

export type EntityType<T> = Type<T>;

export function Entity<T>(config: EntityMetaOptions<T>) {
    // TODO: Add entity name uniqueness validation
    return (target: EntityType<T>) => {
        ENTITY_META_MAP.set(target, config);
    };
}

export function RESTResource<T>(config: EntityResourceMetaOptions) {
    return (target: EntityType<T>) => {
        RESOURCE_MAP.set(target, config);
    };
}

export function getEntityMetadata<T>(target: EntityType<T>): EntityMetaOptions<T> | undefined {
    return ENTITY_META_MAP.get(target);
}

export function getResourceMetadata<T>(
    target: EntityType<T>
): EntityResourceMetaOptions | undefined {
    return RESOURCE_MAP.get(target);
}

export function getEntityMetadataByEntityName<T>(
    entityName: string
): EntityMetaOptions<T> | undefined {
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

export const getEntityByName = (entityName: string) => {
    for (const [target, options] of Array.from(ENTITY_META_MAP)) {
        if (options.name === entityName) {
            return target as EntityType<any>;
        }
    }
};

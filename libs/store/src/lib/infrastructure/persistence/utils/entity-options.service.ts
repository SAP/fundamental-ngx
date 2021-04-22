import { Injectable } from '@angular/core';

import {
    getEntityMetadata,
    getResourceMetadata,
    getEntityMetadataByEntityName,
    getEntityResourceMetadataByEntityName,
    getEntityByName,
    EntityType
} from '../../../domain/decorators';
import { EntityMetaOptions } from '../../../domain/entity-meta-options';
import { EntityResourceMetaOptions } from '../../../domain/rest-resource';
import { EntityBaseType } from '../store/entity-server/interfaces';

export { EntityMetaOptions };
export { EntityResourceMetaOptions };

/**
 * Service to retrieve Entity meta options
 */
export abstract class EntityMetaOptionsService {
    /**
     * Get Entity Resource Options
     * @param entity Entity name or Entity class
     */
    abstract getEntityResourceMetadata<T>(entity: string | EntityType<T>): EntityResourceMetaOptions;
    /**
     * Get Entity Meta Options
     * @param entity Entity name or Entity class
     */
    abstract getEntityMetadata<T>(entity: string | EntityType<T>): EntityMetaOptions<T>;

    abstract getEntityTypeByName(entityName: string): EntityBaseType;
}

/**
 * Default implementation of EntityMetaOptionsService
 */
@Injectable()
export class DefaultEntityMetaOptionsService<T> implements EntityMetaOptionsService {
    getEntityResourceMetadata<T>(entityOrName: string | EntityType<T>): EntityResourceMetaOptions {
        const options =
            typeof entityOrName === 'string'
                ? getEntityResourceMetadataByEntityName(entityOrName)
                : getResourceMetadata(entityOrName);

        if (!options) {
            throw Error(`Could not find meta data for a given entity: ${entityOrName}`);
        }

        return options;
    }

    getEntityMetadata<T>(entityOrName: string | EntityType<T>): EntityMetaOptions<T> {
        const options: EntityMetaOptions<T>  =
            typeof entityOrName === 'string'
                ? getEntityMetadataByEntityName<T>(entityOrName)
                : getEntityMetadata(entityOrName);

        if (!options) {
            throw Error(`Could not find meta data for a given entity: ${entityOrName}`);
        }

        return options;
    }

    getEntityTypeByName(entityName: string): EntityBaseType {
        const options = getEntityByName(entityName);

        if (!options) {
            throw Error(`Could not find entity for a given entity name: ${entityName}`)
        }

        return options;
    }
}

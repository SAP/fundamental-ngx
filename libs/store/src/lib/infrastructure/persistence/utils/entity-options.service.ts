import { Injectable } from '@angular/core';

import {
    getEntityMetadata,
    getResourceMetadata,
    getEntityMetadataByEntityName,
    getEntityResourceMetadataByEntityName,
    EntityType
} from '../../../domain/decorators';
import { BaseEntity } from '../../../domain/entity';
import { EntityMetaOptions } from '../../../domain/entity-meta-options';
import { EntityResourceMetaOptions } from '../../../domain/rest-resource';

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
    abstract getEntityResourceMetadata<T extends BaseEntity>(entity: string | EntityType<T>): EntityResourceMetaOptions;
    /**
     * Get Entity Meta Options
     * @param entity Entity name or Entity class
     */
    abstract getEntityMetadata<T extends BaseEntity>(entity: string | EntityType<T>): EntityMetaOptions<T>;
}

/**
 * Default implementation of EntityMetaOptionsService
 */
@Injectable()
export class DefaultEntityMetaOptionsService implements EntityMetaOptionsService {
    getEntityResourceMetadata<T extends BaseEntity>(entityOrName: string | EntityType<T>): EntityResourceMetaOptions {
        const options =
            typeof entityOrName === 'string'
                ? getEntityResourceMetadataByEntityName(entityOrName)
                : getResourceMetadata(entityOrName);

        if (!options) {
            throw Error(`Could not find meta data for a given entity: ${entityOrName}`);
        }

        return options;
    }

    getEntityMetadata<T extends BaseEntity>(entityOrName: string | EntityType<T>): EntityMetaOptions<T> {
        const options: EntityMetaOptions<T>  =
            typeof entityOrName === 'string'
                ? getEntityMetadataByEntityName(entityOrName) as EntityMetaOptions<T>
                : getEntityMetadata(entityOrName);

        if (!options) {
            throw Error(`Could not find meta data for a given entity: ${entityOrName}`);
        }

        return options;
    }
}

import { Injectable, Type } from '@angular/core';

import {
    getEntityMetadata,
    getResourceMetadata,
    getEntityMetadataByEntityName,
    getEntityResourceMetadataByEntityName
} from '../../../domain/decorators';
import { EntityMetaOptions } from '../../../domain/entity';
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
    abstract getEntityResourceMetadata<T>(entity: string | Type<T>): EntityResourceMetaOptions;
    /**
     * Get Entity Meta Options
     * @param entity Entity name or Entity class
     */
    abstract getEntityMetadata<T>(entity: string | Type<T>): EntityMetaOptions;
}

/**
 * Default implementation of EntityMetaOptionsService
 */
@Injectable()
export class DefaultEntityMetaOptionsService implements EntityMetaOptionsService {
    getEntityResourceMetadata<T>(entityOrName: string | Type<T>): EntityResourceMetaOptions {
        const options =
            typeof entityOrName === 'string'
                ? getEntityResourceMetadataByEntityName(entityOrName)
                : getResourceMetadata(entityOrName);

        if (!options) {
            throw Error(`Could not find meta data for a given entity: ${entityOrName}`);
        }

        return options;
    }

    getEntityMetadata<T>(entityOrName: string | Type<T>): EntityMetaOptions {
        const options =
            typeof entityOrName === 'string'
                ? getEntityMetadataByEntityName(entityOrName)
                : getEntityMetadata(entityOrName);

        if (!options) {
            throw Error(`Could not find meta data for a given entity: ${entityOrName}`);
        }

        return options;
    }
}

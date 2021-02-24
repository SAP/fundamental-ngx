import { Type } from '@angular/core';

import { EntityMetaOptions } from '../../domain/entity';
import { EntityResourceMetaOptions } from '../../domain/rest-resource';

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

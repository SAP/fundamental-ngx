import { Type } from '@angular/core';

import { EntityMetaOptions } from '../../domain/entity';
import { EntityResourceMetaOptions } from '../../domain/rest-resource';

export { EntityMetaOptions };
export { EntityResourceMetaOptions };

/**
 * Service to retrieve Entity meta options
 */
export abstract class EntityMetaOptionsService {
    abstract getEntityResourceMetadata<T>(entity: string): EntityResourceMetaOptions;
    abstract getEntityResourceMetadata<T>(entity: Type<T>): EntityResourceMetaOptions;

    abstract getEntityMetadata(entity: string): EntityMetaOptions;
    abstract getEntityMetadata<T>(entity: Type<T>): EntityMetaOptions;
}

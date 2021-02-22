import { Injectable, Type } from '@angular/core';

import { EntityMetaOptions } from '../../domain/entity';
import { EntityResourceMetaOptions } from '../../domain/rest-resource';
import {
    getEntityMetadata,
    getResourceMetadata,
    getEntityMetadataByEntityName,
    getEntityResourceMetadataByEntityName
} from '../../domain/decorators';

export { EntityMetaOptions };
export { EntityResourceMetaOptions };

@Injectable()
export class EntityMetaOptionsService {
    getEntityResourceMetadata<T>(entity: string): EntityResourceMetaOptions;
    getEntityResourceMetadata<T>(entity: Type<T>): EntityResourceMetaOptions;
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

    getEntityMetadata(entity: string): EntityMetaOptions;
    getEntityMetadata<T>(entity: Type<T>): EntityMetaOptions;
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

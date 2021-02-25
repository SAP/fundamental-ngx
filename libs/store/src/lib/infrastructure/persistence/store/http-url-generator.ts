import { Injectable } from '@angular/core';
import { Pluralizer } from '@ngrx/data';

import { EntityOperation, EntityPath } from '../../../domain/rest-resource';

/**
 * Generate the base part of an HTTP URL for
 * single entity or entity collection resource
 */
export abstract class HttpUrlGenerator {
    /**
     * Return the base URL for a single entity resource,
     * e.g., the base URL to get a single hero by its id
     */
    abstract entityResource(entityName: string, root: string, operation: EntityOperation, path?: EntityPath): string;

    /**
     * Return the base URL for a collection resource,
     * e.g., the base URL to get all heroes
     */
    abstract collectionResource(
        entityName: string,
        root: string,
        operation: EntityOperation,
        path?: EntityPath
    ): string;
}

/**
 * HTTP URl Generator
 *
 * This implementation takes into account the Entity meta options
 *
 */
@Injectable()
export class DefaultHttpUrlGenerator implements HttpUrlGenerator {
    constructor(private pluralizer: Pluralizer) {}

    entityResource(entityName: string, root: string, operation: EntityOperation, path?: EntityPath): string {
        return this.getEntityResourceUrl(entityName, root, operation, path);
    }

    collectionResource(entityName: string, root: string, operation: EntityOperation, path?: EntityPath): string {
        return this.getEntityResourceUrl(entityName, root, operation, path, true);
    }

    protected getEntityResourceUrl(
        entityName: string,
        root: string,
        operation: EntityOperation,
        entityPath: EntityPath | undefined,
        pluralize = false
    ): string {
        let path: string = pluralize ? this.pluralizer.pluralize(entityName) : entityName;

        if (entityPath) {
            path = this.getEntityOperationPath(entityPath, operation) || path;
        }

        return `${normalize(root)}/${normalize(path)}/`.toLowerCase();
    }

    protected getEntityOperationPath(path: EntityPath, operation: EntityOperation): string | null {
        if (typeof path === 'string') {
            return path;
        }
        const pathOperation = path[operation];
        if (!pathOperation && path.default) {
            return path.default;
        }
        if (typeof pathOperation === 'string') {
            return pathOperation;
        }
        if (Array.isArray(pathOperation)) {
            return pathOperation[1];
        }
        return null;
    }
}

/** Remove leading & trailing spaces or slashes */
const normalize = (str: string) => {
    return str.replace(/^[\/\s]+|[\/\s]+$/g, '');
};

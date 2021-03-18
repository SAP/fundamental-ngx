import { CachePolicy } from './cache-policy';

/** REST Resource Options */
export interface EntityResourceMetaOptions {
    // Base URI
    root?: string;
    // Resource Path
    path?: EntityPath;
    // Cache policy
    cache?: CachePolicy;
}

export type EntityPath = string | EntityComplexPath;

// All allowed HTTP methods
export const HTTP_METHODS = ['GET', 'DELETE', 'POST', 'PUT', 'PATCH'] as const;
export type HttpMethod = typeof HTTP_METHODS[number];

// All allowed operations
export const ENTITY_OPERATIONS = ['add', 'delete', 'getAll', 'getById', 'update', 'upsert'] as const;
export type EntityOperation = typeof ENTITY_OPERATIONS[number];

export type EntityOperationComplexPath = {
    [key in EntityOperation]?: string | [HttpMethod, string];
}

/** Entity Path Details */
export type EntityComplexPath = {
    default?: string;
} & EntityOperationComplexPath;


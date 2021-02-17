/** REST Resource Options */
export interface RESTResourceMetaOptions {
    // Base URI
    root?: string;
    // Resource Path
    path?: EntityPath;
}

export type EntityPath = string | EntityComplexPath;

/** Entity Path Details */
export interface EntityComplexPath {
    default: string;
    add?: string | [HttpMethod, string];
    delete?: string | [HttpMethod, string];
    getAll?: string | [HttpMethod, string];
    getById?: string | [HttpMethod, string];
    update?: string | [HttpMethod, string];
    upsert?: string | [HttpMethod, string];
}

export type HttpMethod = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';

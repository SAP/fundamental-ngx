import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    DefaultDataServiceConfig,
    DefaultDataService,
    EntityHttpResourceUrls,
    HttpResourceUrls,
    HttpUrlGenerator,
    DefaultHttpUrlGenerator as NgrxDefaultHttpUrlGenerator,
    Pluralizer,
    HttpMethods,
    RequestData
} from '@ngrx/data';
import { Observable } from 'rxjs';

/**
 * This Service is used to make API server request.
 *
 * This should be provided instead of ngrx DefaultDataService.
 *
 */
export class EntityStoreServer<T> extends DefaultDataService<T> {
    constructor(
        // Entity Name it's bound to
        entityName: string,
        protected http: HttpClient,
        protected httpUrlGenerator: DefaultHttpUrlGenerator,
        config?: DefaultDataServiceConfig
    ) {
        super(entityName, http, httpUrlGenerator, config);
    }

    add(entity: T): Observable<T> {
        const entityUrl = this.httpUrlGenerator.collectionResource(this.entityName, 'add');
        return this.execute('POST', entityUrl);
    }

    // the same for others commands

    private getEntityOperationUrl(): string {}
}

@Injectable()
export class DefaultHttpUrlGenerator extends NgrxDefaultHttpUrlGenerator {
    constructor(pluralizer: Pluralizer) {
        super(pluralizer);
    }

    protected getResourceUrls(entityName: string, operation: string): HttpResourceUrls {
        // build url based on entity settings and operation method
        return {
            collectionResourceUrl: entityName + operation,
            entityResourceUrl: entityName + operation
        };
    }

    entityResource(entityName: string, operation: string): string {
        return this.getResourceUrls(entityName, operation).entityResourceUrl;
    }

    collectionResource(entityName: string, operation: string): string {
        return this.getResourceUrls(entityName, operation).collectionResourceUrl;
    }

    /**
     * Register known single-entity and collection resource URLs for HTTP calls
     * @param entityHttpResourceUrls {EntityHttpResourceUrls} resource urls for specific entity type names
     * Well-formed resource urls end in a '/';
     * Note: this method does not ensure that resource urls are well-formed.
     */
    registerHttpResourceUrls(entityHttpResourceUrls: EntityHttpResourceUrls): void {
        this.knownHttpResourceUrls = {
            ...this.knownHttpResourceUrls,
            ...(entityHttpResourceUrls || {})
        };
    }
}

import { Injectable, Optional } from '@angular/core';
import { ContentDensity, ContentDensityService } from './content-density.service';
import { distinctUntilChanged, filter, merge, Observable, tap } from 'rxjs';

/**
 * Service to share ContentDensity with children components
 * and to stop reacting to global ContentDensity changes once the value is set in the @Input.
 * Child components can get the ContentDensity value in template using | listenDensity pipe.
 * This service should be provided in the root component & setDensity method should be called in ContentDensity @Input setter.
 */
@Injectable()
export class LocalContentDensityService extends ContentDensityService {
    private updatedLocally = false;

    constructor(@Optional() private contentDensityService: ContentDensityService) {
        super();
    }

    /** @hidden */
    get _contentDensityListener(): Observable<ContentDensity> {
        if (!this.contentDensityService) {
            return this.contentDensity.pipe(distinctUntilChanged());
        }

        return merge(
            this.contentDensityService._contentDensityListener.pipe(
                filter(() => !this.updatedLocally),
                tap((value) => this.contentDensity.next(value)),
                filter(() => false)
            ),
            this.contentDensity
        ).pipe(distinctUntilChanged());
    }

    /** Notify to stop listening for global ContentDensity changes. */
    setDensity(value: ContentDensity): void {
        if (!value) {
            return;
        }

        this.updatedLocally = true;

        this.contentDensity.next(value);
    }
}

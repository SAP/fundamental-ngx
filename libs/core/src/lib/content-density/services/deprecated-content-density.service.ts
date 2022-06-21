import { Inject, Injectable, OnDestroy } from '@angular/core';
import { GlobalContentDensityService } from './global-content-density.service';
import { BehaviorSubject, Observable, skip, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { isCompact } from '../helpers/density-type-checkers';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { ContentDensityMode } from '../content-density.types';

/**
 * Temporary replacement for ContentDensityService
 */
@Injectable()
export class DeprecatedContentDensityService implements OnDestroy {
    /** Content Density BehaviourSubject */
    readonly contentDensity = new BehaviorSubject<ContentDensityMode>(this._defaultContentDensity);

    constructor(
        private _contentDensityController: GlobalContentDensityService,
        @Inject(DEFAULT_CONTENT_DENSITY) private _defaultContentDensity: ContentDensityMode
    ) {
        this.contentDensity
            .pipe(
                skip(1),
                tap((d) => this._contentDensityController.updateContentDensity(d))
            )
            .subscribe();
    }

    /** @hidden */
    get _contentDensityListener(): Observable<ContentDensityMode> {
        return this._contentDensityController.contentDensityListener();
    }

    /** @hidden */
    get _isCompactDensity(): Observable<boolean> {
        return this._contentDensityController.contentDensityListener().pipe(map(isCompact));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.contentDensity.complete();
    }
}

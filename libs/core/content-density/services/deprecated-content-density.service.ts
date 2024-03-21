import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, skip, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { isCompact } from '../helpers/density-type-checkers';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { ContentDensityMode } from '../types/content-density.mode';
import { GlobalContentDensityService } from './global-content-density.service';

/**
 * Temporary replacement for ContentDensityService
 */
@Injectable()
export class DeprecatedContentDensityService implements OnDestroy {
    /** Content Density BehaviourSubject */
    readonly contentDensity: BehaviorSubject<ContentDensityMode>;

    /** @hidden */
    constructor(private _contentDensityController: GlobalContentDensityService) {
        this.contentDensity = new BehaviorSubject(inject(DEFAULT_CONTENT_DENSITY));
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

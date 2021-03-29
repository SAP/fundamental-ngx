import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

export type ContentDensity = 'cozy' | 'condensed' | 'compact';
export const DEFAULT_CONTENT_DENSITY: ContentDensity = 'cozy';

/**
 * Service taking care of ContentDensity
 */
@Injectable()
export class ContentDensityService {
    private _contentDensity: BehaviorSubject<ContentDensity> = new BehaviorSubject(DEFAULT_CONTENT_DENSITY);

    /** @hidden */
    get _contentDensityListener(): Observable<ContentDensity> {
        return this.contentDensity.pipe(
            distinctUntilChanged(),
            startWith(this.contentDensity.getValue())
        );
    }

    /** Content Density BehaviourSubject */
    get contentDensity(): BehaviorSubject<ContentDensity> {
        return this._contentDensity;
    }

}

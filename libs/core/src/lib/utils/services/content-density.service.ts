import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { isCompactDensity } from '../functions/is-compact-density';

export type ContentDensity = 'cozy' | 'condensed' | 'compact';
export enum ContentDensityEnum {
    COMPACT = 'compact',
    COZY = 'cozy',
    CONDENSED = 'condensed'
}
export const DEFAULT_CONTENT_DENSITY: ContentDensity = 'cozy';

/**
 * Service taking care of ContentDensity
 */
@Injectable()
export class ContentDensityService {
    /** Content Density BehaviourSubject */
    readonly contentDensity = new BehaviorSubject(DEFAULT_CONTENT_DENSITY);

    /** @hidden */
    get _contentDensityListener(): Observable<ContentDensity> {
        return this.contentDensity.pipe(distinctUntilChanged(), startWith(this.contentDensity.getValue()));
    }

    /** @hidden */
    get _isCompactDensity(): Observable<boolean> {
        return this._contentDensityListener.pipe(map((density) => isCompactDensity(density)));
    }

    /** @hidden */
    handleWebComponentContentDensity(classList: DOMTokenList, subscriptions: Subscription): void {
        if (this._isCompactDensity) {
            classList.add('ui5-content-density-compact');
        }
        subscriptions.add(
            this.contentDensity.subscribe((density) => {
                isCompactDensity(density)
                    ? classList.add('ui5-content-density-compact')
                    : classList.remove('ui5-content-density-compact');
            })
        );
    }
}

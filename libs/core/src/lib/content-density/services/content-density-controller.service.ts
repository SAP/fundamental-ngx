import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { Observable, Subscription } from 'rxjs';
import { ContentDensityMode } from '../content-density.types';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';

@Injectable()
export class ContentDensityControllerService implements OnDestroy {
    currentContentDensity: ContentDensityMode;
    private _subscription = new Subscription();

    constructor(
        @Inject(ContentDensityStorage) private _storage: ContentDensityStorage,
        @Inject(DEFAULT_CONTENT_DENSITY) private _defaultContentDensity: ContentDensityMode
    ) {
        this._subscription.add(
            this.contentDensityListener().subscribe((density) => {
                this.currentContentDensity = density;
            })
        );
    }

    contentDensityListener(): Observable<ContentDensityMode> {
        return this._storage.getContentDensity();
    }

    updateContentDensity(density: ContentDensityMode): Observable<void> {
        return this._storage.setContentDensity(density);
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}

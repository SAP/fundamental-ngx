import { inject, InjectionToken } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ViewportRuler } from '@angular/cdk/overlay';
import { startWith } from 'rxjs/operators';

/**
 * Injection token for the viewport size observable.
 * Emits the viewport size in pixels, which are outputted by the ViewportRuler
 * from @angular/cdk/overlay.
 */
export const ViewportSizeObservable = new InjectionToken<Observable<number>>('ViewportSizeObservable', {
    providedIn: 'root',
    factory: () => {
        const viewportRuler = inject(ViewportRuler);
        return viewportRuler
            .change(50)
            .pipe(map((e) => (e.target as Window).innerWidth))
            .pipe(startWith(window.innerWidth));
    }
});

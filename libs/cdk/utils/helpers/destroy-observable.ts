import { DestroyRef, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Creates an observable that emits when the component is destroyed.
 * @param destroyRef
 */
export const destroyObservable = (destroyRef = inject(DestroyRef)): Observable<void> => {
    const destroy$ = new Subject<void>();
    destroyRef.onDestroy(() => destroy$.next());
    return destroy$.asObservable();
};

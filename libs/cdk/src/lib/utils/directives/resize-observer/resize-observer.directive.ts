import { ChangeDetectorRef, Directive, ElementRef, inject, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResizeObserverService } from '../../services/resize-observer.service';
import { ResizeObserverChangeDetectorRef } from './resize-observer-change-detector-ref.class';

@Directive({
    selector: '[fdkResizeObserver]',
    exportAs: 'fdkResizeObserver',
    standalone: true
})
export class ResizeObserverDirective {
    /** @hidden */
    private _resizeObserverService = inject(ResizeObserverService);

    /** @hidden */
    private _elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden
     * Change detector if is provided through DI then use it, otherwise use default one.
     * */
    private _cdr = inject(ResizeObserverChangeDetectorRef, { optional: true }) || inject(ChangeDetectorRef);

    /** @hidden
     * Since resize observer does not invoke change detection, we need to do it manually.
     * */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Output()
    resized: Observable<ResizeObserverEntry[]> = this._resizeObserverService
        .observe(this._elementRef.nativeElement)
        .pipe(tap(() => this._cdr.detectChanges()));
}

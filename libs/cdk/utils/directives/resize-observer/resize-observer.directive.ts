import { Directive, ElementRef, inject, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HasElementRef } from '../../interfaces';
import { ResizeObserverService } from '../../services/resize-observer.service';

@Directive({
    selector: '[fdkResizeObserver]',
    exportAs: 'fdkResizeObserver',
    standalone: true
})
export class ResizeObserverDirective implements HasElementRef {
    /**
     * When the element is resized, emits an array of ResizeObserverEntry objects.
     **/
    @Output()
    resized: Observable<ResizeObserverEntry[]>;

    /**
     * The reference to the Resize target element.
     **/
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @ignore */
    private _resizeObserverService = inject(ResizeObserverService);

    /** @ignore */
    constructor() {
        this.resized = this._resizeObserverService.observe(this.elementRef.nativeElement);
    }
}

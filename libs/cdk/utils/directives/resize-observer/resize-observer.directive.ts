import { Directive, ElementRef, inject } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { HasElementRef } from '../../interfaces';
import { ResizeObserverService } from '../../services/resize-observer.service';

@Directive({
    selector: '[fdkResizeObserver]',
    exportAs: 'fdkResizeObserver'
})
export class ResizeObserverDirective implements HasElementRef {
    /**
     * The reference to the Resize target element.
     **/
    readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /**
     * Observable that emits when the element is resized.
     * Use this for programmatic subscriptions.
     **/
    readonly resizeEvents$ = inject(ResizeObserverService).observe(this.elementRef.nativeElement);

    /**
     * When the element is resized, emits an array of ResizeObserverEntry objects.
     **/
    readonly resized = outputFromObservable(this.resizeEvents$);
}

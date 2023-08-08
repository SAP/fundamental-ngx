import { DestroyRef, Directive, ElementRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { intersectionObservable } from '../../functions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
    selector: '[fdkIntersectionSpy]',
    standalone: true
})
export class IntersectionSpyDirective implements OnInit {
    /** Intersection offset in px. */
    @Input('fdkIntersectionSpy')
    offset = 20;
    /** Intersection observer options. */
    @Input()
    viewportOptions: IntersectionObserverInit;

    /** Event emitted when intersection observer emits with the current element. */
    @Output()
    intersected = new EventEmitter<boolean>();

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    ngOnInit(): void {
        intersectionObservable(this._elementRef.nativeElement, this.viewportOptions)
            .pipe(
                map((entries) => entries[0]),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((entry) => {
                this.intersected.emit(entry.isIntersecting);
            });
    }
}

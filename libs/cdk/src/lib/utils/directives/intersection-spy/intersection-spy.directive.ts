import { Directive, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs';
import { intersectionObservable } from '../../functions';
import { DestroyedService } from '../../services';

@Directive({
    selector: '[fdkIntersectionSpy]',
    standalone: true,
    providers: [DestroyedService]
})
export class IntersectionSpyDirective {
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
    private readonly _destroy$ = inject(DestroyedService);

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    ngOnInit(): void {
        intersectionObservable(this._elementRef.nativeElement, this.viewportOptions)
            .pipe(
                map((entries) => entries[0]),
                takeUntil(this._destroy$)
            )
            .subscribe((entry) => {
                this.intersected.emit(entry.isIntersecting);
            });
    }
}

import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject, filter, first, ReplaySubject } from 'rxjs';
import { FN_FOCUSABLE_ITEM_DIRECTIVE } from './focusable.tokens';
import { HasElementRef } from '../has-element-ref';
import { FocusableItemViewModifier } from './focusable-item-view-modifier.interface';
import { setFocusable } from './set-focusable';
import { FocusableObserver } from './focusable.observer';
import { takeUntil, tap } from 'rxjs/operators';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';

@Directive({
    selector: '[fnFocusableItem]',
    providers: [
        {
            provide: FN_FOCUSABLE_ITEM_DIRECTIVE,
            useExisting: FocusableItemDirective
        },
        DestroyedService
    ]
})
export class FocusableItemDirective
    extends ReplaySubject<boolean>
    implements HasElementRef, OnDestroy, AfterViewInit, FocusableItemViewModifier
{
    @Input()
    set fnFocusableItem(val: BooleanInput) {
        this._viewInit$.pipe(filter(Boolean), first()).subscribe(() => this.setFocusable(coerceBooleanProperty(val)));
    }

    get fnFocusableItem(): boolean {
        return this._focusable;
    }

    private _focusable = true;
    private _viewInit$ = new BehaviorSubject(false);

    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _focusableObserver: FocusableObserver,
        private _destroy$: DestroyedService
    ) {
        super(1);
        this._focusableObserver
            .observe(this._elementRef)
            .pipe(
                tap((isFocusable) => {
                    if (isFocusable !== this._focusable) {
                        this.setFocusable(isFocusable);
                        this._focusable = isFocusable;
                        this.next(isFocusable);
                    }
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    ngAfterViewInit(): void {
        this._viewInit$.next(true);
    }

    setFocusable = (isFocusable: boolean): void => {
        setFocusable(this, isFocusable);
    };

    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    ngOnDestroy(): void {
        this.complete();
    }
}

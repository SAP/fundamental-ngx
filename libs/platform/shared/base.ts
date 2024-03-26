import { ChangeDetectorRef, Directive, Input, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { Nullable } from '@fundamental-ngx/cdk/utils';

let randomId = 0;

/**
 * This class contains common properties used across components.
 * this can be extended to reduce the code duplication across components.
 * @hidden for form related Base , see BaseInput.
 */
@Directive()
export abstract class BaseComponent implements OnDestroy {
    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Sets the `aria-labelledby` attribute to the element. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /**
     * @deprecated
     * Use `ariaLabelledBy` instead.
     */
    @Input()
    set ariaLabelledby(value: Nullable<string>) {
        this.ariaDescribedBy = value;
    }

    /** Sets the `aria-describedby` attribute to the element. */
    @Input()
    ariaDescribedBy: Nullable<string>;

    /** id for the Element */
    @Input()
    id = `fdp-id-${randomId++}`;

    /** name for the element */
    @Input()
    name: string;

    /** width of the element */
    @Input()
    width: string;

    /** disabled status of the element */
    @Input()
    set disabled(disabled: boolean) {
        this._disabled = disabled;
    }
    get disabled(): boolean {
        return this._disabled;
    }

    /** @hidden */
    protected _disabled = false;

    /** @hidden */
    protected _subscriptions = new Subscription();

    /**
     * @hidden
     * Change detector ref.
     */
    protected readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * @hidden
     * For internal usage only
     *
     * Since all components use OnPush strategy in the fundamental lib
     * it's tricky to update a child input directly from a parent component class
     *
     */
    markForCheck(): void {
        this._cdr.markForCheck();
    }

    /**
     * @hidden
     * For internal usage only
     *
     * Since all components use OnPush strategy in the fundamental lib
     * it's tricky to update a child input directly from a parent component class
     *
     */
    detectChanges(): void {
        this._cdr.detectChanges();
    }
}

import { ChangeDetectorRef, Directive, Input, OnDestroy } from '@angular/core';
// eslint-disable-next-line
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Nullable } from '@fundamental-ngx/cdk/utils';

let randomId = 0;

/**
 * This class contains common properties used across components.
 * this can be extended to reduce the code duplication across components.
 * @ignore for form related Base , see BaseInput.
 */
@Directive()
export abstract class BaseComponent implements OnDestroy {
    /** @ignore */
    protected defaultId = `fdp-id-${randomId++}`;
    /** @ignore */
    protected _disabled = false;

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Sets the `aria-labelledby` attribute to the element. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Sets the `aria-describedby` attribute to the element. */
    @Input()
    ariaDescribedBy: Nullable<string>;

    /** id for the Element */
    @Input()
    id: string = this.defaultId;

    /** name for the element */
    @Input()
    name: string;

    /** @ignore */
    protected _subscriptions = new Subscription();

    /** @ignore */
    protected _router: Router;

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

    /** @ignore */
    constructor(protected _cd: ChangeDetectorRef) {}

    /** @ignore */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * @ignore
     * For internal usage only
     *
     * Since all components use OnPush strategy in the fundamental lib
     * it's tricky to update a child input directly from a parent component class
     *
     */
    markForCheck(): void {
        this._cd.markForCheck();
    }

    /**
     * @ignore
     * For internal usage only
     *
     * Since all components use OnPush strategy in the fundamental lib
     * it's tricky to update a child input directly from a parent component class
     *
     */
    detectChanges(): void {
        this._cd.detectChanges();
    }
}

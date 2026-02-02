import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import {
    AfterContentInit,
    ChangeDetectorRef,
    computed,
    ContentChildren,
    Directive,
    effect,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    QueryList,
    SimpleChanges
} from '@angular/core';

import { RtlService } from '../../services/rtl.service';
import { FOCUSABLE_ITEM } from './focus-key-manager.tokens';

/** Directive to apply Angular Material FocusKeyManager to lists.
 * To be used with FocusKeyManagerItemDirective
 */
@Directive({
    selector: `[fdkFocusKeyManagerList]`
})
export class FocusKeyManagerListDirective<TItem extends FocusableOption = Record<any, any> & FocusableOption>
    implements OnChanges, AfterContentInit, OnDestroy
{
    /** Orientation for the FocusKeyManager */
    @Input()
    orientation: 'horizontal' | 'vertical';

    /** Skip predicate for the FocusKeyManager */
    @Input()
    skipPredicate: (item: TItem) => boolean;

    /** @hidden */
    @ContentChildren(FOCUSABLE_ITEM)
    readonly _items: QueryList<TItem>;

    /** @hidden */
    get focusKeyManager(): FocusKeyManager<TItem> {
        return this._focusKeyManager;
    }

    /** @hidden */
    private _focusKeyManager: FocusKeyManager<TItem>;

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _isRtl = computed(() => this._rtlService?.rtl() ?? false);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    constructor() {
        // React to RTL changes for horizontal orientation
        effect(() => {
            // Read the RTL signal to track changes
            this._isRtl();

            if (this._focusKeyManager && this.orientation === 'horizontal') {
                this._applyOrientation();
            }
        });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (!this._focusKeyManager) {
            return;
        }

        if ('orientation' in changes) {
            this._applyOrientation();
        }

        if ('skiPredicate' in changes) {
            this._focusKeyManager.skipPredicate(this.skipPredicate);
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._focusKeyManager = new FocusKeyManager<TItem>(this._items).skipPredicate(this.skipPredicate);

        this._applyOrientation();

        this._cdr.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._focusKeyManager.destroy();
    }

    /** Focus certain list's item */
    focusItem(item: number | TItem): any {
        if (typeof item === 'number') {
            this._focusKeyManager.setActiveItem(item);
        } else {
            this._focusKeyManager.setActiveItem(item);
        }
    }

    /** @hidden */
    private _applyOrientation(): void {
        switch (this.orientation) {
            case 'horizontal':
                this._focusKeyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
                break;
            case 'vertical':
                this._focusKeyManager.withVerticalOrientation(true);
                break;
        }
    }
}

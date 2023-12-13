import { Directive, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { PopoverComponent } from './popover.component';

@Directive({
    selector: '[fdPopoverTrigger], [fd-popover-trigger]',
    standalone: true
})
export class PopoverTriggerDirective implements OnDestroy {
    /** Set reference to Popover Component */
    @Input('fdPopoverTrigger')
    set popover(popover: Nullable<PopoverComponent>) {
        if (popover) {
            popover.trigger = this._elementRef;
            this._listenOnExpanded(popover);
        }
        this._setAriaAttributes(popover);
    }

    /** @ignore */
    @HostBinding('attr.aria-haspopup')
    ariaHasPopup: Nullable<boolean>;

    /** @ignore */
    @HostBinding('attr.aria-controls')
    ariaControls: Nullable<string>;

    /** @ignore */
    @HostBinding('attr.aria-expanded')
    ariaExpanded: Nullable<boolean>;

    /** @ignore */
    private _isExpandedSubscription: Subscription;

    /** @ignore */
    constructor(private _elementRef: ElementRef) {}

    /** @ignore */
    ngOnDestroy(): void {
        this._unsubscribeExpandedListener();
    }

    /** @ignore */
    private _listenOnExpanded(popover: PopoverComponent): void {
        this._unsubscribeExpandedListener();
        if (popover) {
            this._isExpandedSubscription = popover.isOpenChange
                .pipe(startWith(popover.isOpen))
                .subscribe((isOpen) => (this.ariaExpanded = isOpen));
        }
    }

    /** @ignore */
    private _setAriaAttributes(popover: Nullable<PopoverComponent>): void {
        this.ariaHasPopup = !!popover;
        this.ariaControls = popover ? popover.id : null;
    }

    /** @ignore */
    private _unsubscribeExpandedListener(): void {
        if (this._isExpandedSubscription) {
            this._isExpandedSubscription.unsubscribe();
        }
    }
}

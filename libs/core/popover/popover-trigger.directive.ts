import { Directive, ElementRef, HostBinding, inject, Injector, Input, OnDestroy } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Subscription } from 'rxjs';
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
            popover.trigger.set(this._elementRef);
            this._listenOnExpanded(popover);
        }
        this._setAriaAttributes(popover);
    }

    /** @hidden */
    @HostBinding('attr.aria-haspopup')
    ariaHasPopup: Nullable<boolean>;

    /** @hidden */
    @HostBinding('attr.aria-controls')
    ariaControls: Nullable<string>;

    /** @hidden */
    @HostBinding('attr.aria-expanded')
    ariaExpanded: Nullable<boolean>;

    /** @hidden */
    private _isExpandedSubscription: Subscription;

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._unsubscribeExpandedListener();
    }

    /** @hidden */
    private _listenOnExpanded(popover: PopoverComponent): void {
        this._unsubscribeExpandedListener();
        if (popover) {
            // Convert signal to observable for reactive updates
            const isOpen$ = toObservable(popover.isOpen, { injector: this._injector });
            this._isExpandedSubscription = isOpen$.subscribe((isOpen) => (this.ariaExpanded = isOpen));
        }
    }

    /** @hidden */
    private _setAriaAttributes(popover: Nullable<PopoverComponent>): void {
        this.ariaHasPopup = !!popover;
        this.ariaControls = popover ? popover.id() : null;
    }

    /** @hidden */
    private _unsubscribeExpandedListener(): void {
        if (this._isExpandedSubscription) {
            this._isExpandedSubscription.unsubscribe();
        }
    }
}

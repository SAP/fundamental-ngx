import { Component, ContentChild, HostBinding, ViewChild, ViewEncapsulation, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';

import { NestedItemDirective } from '../nested-item/nested-item.directive';
import { NestedLinkDirective } from '../nested-link/nested-link.directive';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { PopoverComponent } from '../../popover/popover.component';
import { RtlService } from '../../utils/public_api';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-nested-list-popover',
    templateUrl: './nested-list-popover.component.html',
    styleUrls: ['./nested-list-popover.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NestedListPopoverComponent {
    /** @hidden */
    placement$: Observable<string>;

    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverComponent: PopoverComponent;

    /** @hidden */
    @HostBinding('class.fd-nested-list__popover')
    popoverClass: boolean = true;

    /** @hidden */
    @ContentChild(NestedLinkDirective)
    linkDirective: NestedLinkDirective;

    /**
     * @hidden
     * Reference to parent item, to propagate open and close change from popover.
     */
    parentItemElement: NestedItemDirective;

    /**
     * @hidden
     */
    open: boolean = false;

    /** @hidden */
    constructor(
        private _keyboardNestService: NestedListKeyboardService,
        @Optional() private _rtlService: RtlService
    ) {
        this._listenOnKeyboardRefresh();
        this._createRtlObservable();
    }

    /**
     * Method called, when open state is changed, from popover component (escape key, outside click).
     */
    handleOpenChange(open: boolean): void {
        this.open = open;
        if (this.parentItemElement) {
            if (open) {
                this.parentItemElement.triggerOpen();
            } else {
                this.parentItemElement.triggerClose();
            }
        }
    }

    /** @hidden */
    private _listenOnKeyboardRefresh(): void {
        this._keyboardNestService.refresh$.subscribe(() => {
            /** Update popover position, on list of hidden items change */
            if (this.popoverComponent) {
                this.popoverComponent.updatePopover();
            }
        });
    }

    /** @hidden */
    private _createRtlObservable(): void {
        this.placement$ = this._rtlService
            ? this._rtlService.rtl.pipe(map(isRtl => isRtl ? 'left-start' : 'right-start'))
            : of('right-start')
    }
}

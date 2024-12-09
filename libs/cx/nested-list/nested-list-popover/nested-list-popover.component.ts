import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    HostBinding,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation,
    computed
} from '@angular/core';

import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { RtlService } from '@fundamental-ngx/core/utils';
import { NestedItemInterface } from '../nested-item/nested-item.interface';
import { NestedItemService } from '../nested-item/nested-item.service';
import { NestedLinkComponent } from '../nested-link/nested-link.component';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListPopoverInterface } from './nested-list-popover.interface';

@Component({
    selector: 'fdx-nested-list-popover',
    templateUrl: './nested-list-popover.component.html',
    styleUrl: './nested-list-popover.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NestedListPopoverComponent implements NestedListPopoverInterface, OnInit {
    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverComponent: PopoverComponent;

    /** @hidden */
    @HostBinding('class.fdx-nested-list__popover')
    popoverClass = true;

    /** @hidden */
    @ContentChild(NestedLinkComponent)
    linkDirective: NestedLinkComponent;

    /**
     * @hidden
     * Reference to parent item, to propagate open and close change from popover.
     */
    parentItemElement: NestedItemInterface;

    /** @hidden */
    placement$ = computed(() => (this._rtlService?.rtlSignal() ? 'left-start' : 'right-start'));

    /** @hidden */
    open = false;

    /** @hidden */
    _closeScrollStrategy: ScrollStrategy;

    /** @hidden */
    constructor(
        private _keyboardNestService: NestedListKeyboardService,
        @Optional() private _itemService: NestedItemService,
        @Optional() private _rtlService: RtlService,
        private _overlay: Overlay
    ) {
        this._listenOnKeyboardRefresh();
        if (this._itemService) {
            this._itemService.popover = this;
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._closeScrollStrategy = this._overlay.scrollStrategies.close();
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
                this.popoverComponent.refreshPosition();
            }
        });
    }
}

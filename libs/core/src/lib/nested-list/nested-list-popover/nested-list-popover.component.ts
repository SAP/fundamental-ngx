import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    HostBinding,
    Input,
    Optional,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Observable, of } from 'rxjs';

import { NestedLinkDirective } from '../nested-link/nested-link.directive';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { map } from 'rxjs/operators';
import { NestedItemInterface } from '../nested-item/nested-item.interface';
import { NestedItemService } from '../nested-item/nested-item.service';
import { NestedListPopoverInterface } from './nested-list-popover.interface';
import { NestedListContentDirective } from '../nested-content/nested-list-content.directive';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { Placement } from '@fundamental-ngx/core/shared';

@Component({
    selector: 'fd-nested-list-popover',
    templateUrl: './nested-list-popover.component.html',
    styleUrls: ['./nested-list-popover.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedListPopoverComponent implements NestedListPopoverInterface, AfterContentInit {
    /** @hidden
     * For Internal Usage - Gets information about title, which should be displayed inside popover
     */
    @Input()
    title = '';

    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverComponent: PopoverComponent;

    /** @hidden */
    @HostBinding('class.fd-nested-list__popover')
    popoverClass = true;

    /** @hidden */
    @ContentChild(NestedLinkDirective)
    linkDirective: NestedLinkDirective;

    /** @hidden */
    @ContentChild(NestedListContentDirective)
    contentDirective: NestedListContentDirective;

    /**
     * @hidden
     * Reference to parent item, to propagate open and close change from popover.
     */
    parentItemElement: NestedItemInterface;

    /** @hidden */
    placement$: Observable<Placement>;

    /** @hidden */
    open = false;

    /** @hidden */
    constructor(
        private _keyboardNestService: NestedListKeyboardService,
        @Optional() private _itemService: NestedItemService,
        @Optional() private _rtlService: RtlService
    ) {
        this._listenOnKeyboardRefresh();
        this._createRtlObservable();
        if (this._itemService) {
            this._itemService.popover = this;
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        if (!this.title) {
            this.title = this._getTitle();
        }
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

    /** Returns title of nested link element inside content directive */
    private _getTitle(): string {
        if (this.contentDirective && this.contentDirective.nestedLink) {
            return this.contentDirective.nestedLink.getTitle();
        } else {
            return '';
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

    /** @hidden */
    private _createRtlObservable(): void {
        this.placement$ = this._rtlService
            ? this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'left-start' : 'right-start')))
            : of('right-start');
    }
}

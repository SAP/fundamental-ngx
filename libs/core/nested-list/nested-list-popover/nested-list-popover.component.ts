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

import { AsyncPipe } from '@angular/common';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';
import { map } from 'rxjs/operators';
import { NestedListContentDirective } from '../nested-content/nested-list-content.directive';
import { NestedItemInterface } from '../nested-item/nested-item.interface';
import { NestedItemService } from '../nested-item/nested-item.service';
import { NestedLinkDirective } from '../nested-link/nested-link.directive';
import { NestedListTitleDirective } from '../nested-list-directives';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListPopoverInterface } from './nested-list-popover.interface';

@Component({
    selector: 'fd-nested-list-popover',
    templateUrl: './nested-list-popover.component.html',
    styleUrl: './nested-list-popover.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        NestedLinkDirective,
        NestedListTitleDirective,
        AsyncPipe
    ]
})
export class NestedListPopoverComponent implements NestedListPopoverInterface, AfterContentInit {
    /** @ignore
     * For Internal Usage - Gets information about title, which should be displayed inside popover
     */
    @Input()
    title = '';

    /** @ignore */
    @ViewChild(PopoverComponent)
    popoverComponent: PopoverComponent;

    /** @ignore */
    @HostBinding('class.fd-nested-list__popover')
    popoverClass = true;

    /** @ignore */
    @ContentChild(NestedLinkDirective)
    linkDirective: NestedLinkDirective;

    /** @ignore */
    @ContentChild(NestedListContentDirective)
    contentDirective: NestedListContentDirective;

    /**
     * @ignore
     * Reference to parent item, to propagate open and close change from popover.
     */
    parentItemElement: NestedItemInterface;

    /** @ignore */
    placement$: Observable<Placement>;

    /** @ignore */
    open = false;

    /** @ignore */
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

    /** @ignore */
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

    /** @ignore */
    private _listenOnKeyboardRefresh(): void {
        this._keyboardNestService.refresh$.subscribe(() => {
            /** Update popover position, on list of hidden items change */
            if (this.popoverComponent) {
                this.popoverComponent.refreshPosition();
            }
        });
    }

    /** @ignore */
    private _createRtlObservable(): void {
        this.placement$ = this._rtlService
            ? this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'left-start' : 'right-start')))
            : of('right-start');
    }
}

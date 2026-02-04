import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    inject,
    Input,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';
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
    host: {
        class: 'fd-nested-list__popover'
    },
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        NestedLinkDirective,
        NestedListTitleDirective
    ]
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
    open = false;

    /** @hidden */
    protected readonly placement = computed<Placement>(() => (this._rtlService?.rtl() ? 'left-start' : 'right-start'));

    /** @hidden */
    private readonly _keyboardNestService = inject(NestedListKeyboardService);

    /** @hidden */
    private readonly _itemService = inject(NestedItemService, { optional: true });

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    constructor() {
        this._listenOnKeyboardRefresh();
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
}

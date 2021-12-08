import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { DOWN_ARROW, ENTER, F2, LEFT_ARROW, MAC_ENTER, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';

import { KeyUtil } from '@fundamental-ngx/core/utils';

import { TableCellNavigationId, TableService } from '../table.service';
import { FIRST_CELL_NAVIGATION_ID } from '../constants';
import { DOCUMENT } from '@angular/common';

/** @dynamic */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdTableCellSelectable], [fd-table-cell-selectable]'
})
export class FdpCellSelectableDirective implements OnChanges {
    /** Used to register cell as focusable to have ability to navigate over it */
    @Input('fd-table-cell-selectable')
    navigationId: TableCellNavigationId;

    /** @hidden */
    @HostBinding('attr.tabindex')
    _tabindex = -1;

    /** @hidden */
    constructor(
        readonly _elRef: ElementRef,
        private readonly _tableService: TableService,
        @Inject(DOCUMENT) private readonly _document: Document | null
    ) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('navigationId' in changes) {
            this._tabindex = this.navigationId === FIRST_CELL_NAVIGATION_ID ? 0 : -1;
            this._tableService.registerFocusableTableCell(this.navigationId, this);
        }
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _onKeyDown(event: KeyboardEvent): void {
        if (
            KeyUtil.isKeyCode(event, F2) ||
            (!this._tableService.isFocusInsideTableCell && KeyUtil.isKeyCode(event, ENTER))
        ) {
            this._tableService.processFocusInsideCell(this.navigationId);
            return;
        }

        const arrowKeyCodes = [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW];
        if (document.activeElement === this._elRef.nativeElement && KeyUtil.isKeyCode(event, arrowKeyCodes)) {
            event.stopPropagation();
            event.preventDefault();

            this._tableService.focusNextTableCell(this.navigationId, event);
        }
    }

    /** @hidden */
    @HostListener('focusin')
    _onFocusIn(): void {
        if (!this.navigationId) {
            return;
        }

        this._tableService.setFocusedTableCell(this.navigationId);
    }

    /** @hidden */
    @HostListener('blur')
    _onBlur(): void {
        if (this.navigationId !== FIRST_CELL_NAVIGATION_ID) {
            this._tabindex = -1;
        }
    }

    /** @hidden */
    @HostListener('mousedown')
    _onMouseDown(): void {
        this._tableService.focusNextTableCell(this.navigationId);
    }

    /** @hidden */
    @HostListener('click')
    _onClick(): void {
        if (this._document.activeElement !== this._elRef.nativeElement) {
            this._tableService.setFocusInsideCell();
        } else {
            this._tableService.removeFocusInsideCell();
        }
    }

    /** Focus table cell */
    focus(): void {
        this._tabindex = 0;
        this._elRef.nativeElement.focus();
    }
}

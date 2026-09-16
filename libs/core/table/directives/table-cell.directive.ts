import { afterNextRender, booleanAttribute, contentChildren, Directive, effect, input } from '@angular/core';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE, FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { FD_CHECKBOX_COMPONENT } from '@fundamental-ngx/core/checkbox';

@Directive({
    selector: '[fdTableCell], [fd-table-cell]',
    providers: [
        {
            provide: FDK_FOCUSABLE_ITEM_DIRECTIVE,
            useExisting: TableCellDirective
        }
    ],
    host: {
        class: 'fd-table__cell',
        '[class.fd-table__cell--no-horizontal-border]': 'noBorderX()',
        '[class.fd-table__cell--no-vertical-border]': 'noBorderY()',
        '[class.fd-table__cell--activable]': 'activable()',
        '[class.fd-table__cell--hoverable]': 'hoverable()',
        '[class.fd-table__cell--fit-content]': 'fitContent()',
        '[class.fd-table__cell--no-padding]': 'noPadding()',
        '[class.fd-table__cell--no-data]': 'noData()',
        '[class.fd-table__cell--non-interactive]': 'nonInteractive()',
        '[class.fd-table__cell--focusable]': 'isFocusable()',
        '[attr.role]': 'role()',
        '(focusin)': '_focusIn()',
        '(focusout)': '_focusOut()'
    }
})
export class TableCellDirective extends FocusableItemDirective {
    /** ARIA role for the table cell */
    readonly role = input('gridcell');

    /** Whether to show the table cell's horizontal borders */
    readonly noBorderX = input(false, { transform: booleanAttribute });

    /** Whether to show the table cell's vertical borders */
    readonly noBorderY = input(false, { transform: booleanAttribute });

    /** Whether the table cell is activable */
    readonly activable = input(false, { transform: booleanAttribute });

    /**
     * Whether the table cell is focusable.
     * This input syncs with the parent FocusableItemDirective's focusable state.
     */
    readonly focusable = input(false, { transform: booleanAttribute });

    /** Whether the table cell is hoverable */
    readonly hoverable = input(false, { transform: booleanAttribute });

    /** Whether the table cell's width should fit to content  */
    readonly fitContent = input(false, { transform: booleanAttribute });

    /** Whether the table cell shouldn't have padding on sides */
    readonly noPadding = input(false, { transform: booleanAttribute });

    /** Whether the table cell indicates that there is no data */
    readonly noData = input(false, { transform: booleanAttribute });

    /** Whether the table cell inside table header should be non-interactive */
    readonly nonInteractive = input(false, { transform: booleanAttribute });

    /** Key of a cell element, it's used to identify this cell with certain column */
    readonly key = input<string>();

    /** @hidden */
    readonly _checkboxes = contentChildren(FD_CHECKBOX_COMPONENT);

    /** @hidden */
    private _parentPreviousTabIndex: number | undefined;

    /** @hidden */
    constructor() {
        super();
        this.setFocusable(false);

        // Sync focusable input with parent's focusable state
        effect(() => {
            const focusableValue = this.focusable();
            this.setFocusable(focusableValue);
        });

        // Add checkbox class and colspan after content is available
        afterNextRender(() => {
            const cell = this.elementRef.nativeElement;

            if (this._checkboxes().length) {
                cell.classList.add('fd-table__cell--checkbox');
            }

            if (this.noData()) {
                cell.setAttribute('colspan', '100%');
            }
        });
    }

    /** @hidden */
    protected _focusIn(): void {
        const parentEl = this.elementRef.nativeElement.parentElement;
        this._parentPreviousTabIndex = parentEl?.tabIndex;
        parentEl?.removeAttribute('tabindex');
    }

    /** @hidden */
    protected _focusOut(): void {
        const parentEl = this.elementRef.nativeElement.parentElement;
        if (this._parentPreviousTabIndex) {
            parentEl?.setAttribute('tabindex', this._parentPreviousTabIndex.toString());
        }
    }
}

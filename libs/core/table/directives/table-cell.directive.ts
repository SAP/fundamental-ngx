import {
    afterNextRender,
    booleanAttribute,
    computed,
    contentChildren,
    Directive,
    effect,
    inject,
    input,
    Renderer2
} from '@angular/core';
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
        '[attr.role]': 'computedRole()',
        '(focusin)': '_focusIn()',
        '(focusout)': '_focusOut()'
    }
})
export class TableCellDirective extends FocusableItemDirective {
    /** ARIA role for the table cell (only used if explicitly provided) */
    readonly role = input<string>();

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

    /** @hidden Computed role based on element type and parent context */
    protected readonly computedRole = computed(() => {
        // If role is explicitly provided via input, use it
        const explicitRole = this.role();

        if (explicitRole) {
            return explicitRole;
        }

        // Otherwise, determine role based on element and parent context
        const element = this.elementRef.nativeElement;
        const tagName = element.tagName.toLowerCase();

        // td elements always get gridcell
        if (tagName === 'td') {
            return 'gridcell';
        }

        // th elements need to check their parent context
        if (tagName === 'th') {
            const parent = element.parentElement;
            const grandparent = parent?.parentElement;

            if (grandparent) {
                const grandparentTag = grandparent.tagName.toLowerCase();

                if (grandparentTag === 'thead') {
                    return 'columnheader';
                } else if (grandparentTag === 'tbody') {
                    return 'rowheader';
                }
            }
        }

        // Default fallback
        return 'gridcell';
    });

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

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

        // Set scope="row" for th elements in tbody
        effect(() => {
            const role = this.computedRole();
            const element = this.elementRef.nativeElement;

            if (role === 'rowheader') {
                this._renderer.setAttribute(element, 'scope', 'row');
            } else {
                this._renderer.removeAttribute(element, 'scope');
            }
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

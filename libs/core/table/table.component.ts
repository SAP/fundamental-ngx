import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChildren,
    effect,
    inject,
    input,
    ViewEncapsulation
} from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableService } from './table.service';

export const FdTableContentDensityProviderParams = {
    supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.CONDENSED, ContentDensityMode.COZY]
};

/**
 * The component that represents a table.
 * A table is a set of tabular data. Line items can support data, images and actions.
 * ```html
 * <table fd-table></table>
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'table[fd-table]',
    exportAs: 'fd-table',
    template: `<ng-content></ng-content>`,
    styleUrl: './table.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TableService, contentDensityObserverProviders(FdTableContentDensityProviderParams)],
    hostDirectives: [FocusableGridDirective],
    host: {
        class: 'fd-table',
        '[class.fd-table--no-horizontal-borders]': 'noBorderX()',
        '[class.fd-table--no-vertical-borders]': 'noBorderY()',
        '[class.fd-table--no-outer-border]': 'noOuterBorder()',
        '[class.fd-table--top-border]': 'topBorder()',
        '[class.fd-table--pop-in]': 'popIn()',
        '[class.fd-table--responsive]': 'responsive()',
        '[attr.role]': 'role()',
        '[attr.aria-colcount]': 'ariaColCount()'
    }
})
export class TableComponent {
    /** ARIA role for the table */
    readonly role = input('grid');

    /** Whether or not to show the table's horizontal borders */
    readonly noBorderX = input(false, { transform: booleanAttribute });

    /** Whether or not to show the table's vertical borders */
    readonly noBorderY = input(false, { transform: booleanAttribute });

    /** Whether or not to show the table's outer border */
    readonly noOuterBorder = input(false, { transform: booleanAttribute });

    /** Whether or not to show the table's top border */
    readonly topBorder = input(false, { transform: booleanAttribute });

    /** Whether or not to display the table in pop in mode, it also require change of markup */
    readonly popIn = input(false, { transform: booleanAttribute });

    /** Whether or not to display the table in responsive mode. */
    readonly responsive = input(false, { transform: booleanAttribute });

    /** List of keys that identifies single columns */
    readonly keys = input<string[]>();

    /** Applies `focusable` to all cells within this table */
    readonly allCellsFocusable = input(false, { transform: booleanAttribute });

    /** @hidden */
    readonly _cells = contentChildren(TableCellDirective, { descendants: true });

    /**
     * @hidden
     * Computed aria-colcount attribute - total number of columns in the grid
     * Required when aria-colindex is set on cells */
    protected readonly ariaColCount = computed(() => {
        const keys = this.keys();
        if (keys && keys.length > 0) {
            // If keys are provided, use that count (includes hidden columns)
            return keys.length;
        }

        // Otherwise, determine from the first row's visible cell count
        // This assumes all rows have the same number of columns
        const cells = this._cells();
        if (cells.length === 0) {
            return null;
        }

        // Group cells by their parent row and count cells in first row
        const firstRow = cells[0]?.elementRef.nativeElement.parentElement;
        if (!firstRow) {
            return null;
        }

        const cellsInFirstRow = cells.filter((cell) => cell.elementRef.nativeElement.parentElement === firstRow);

        return cellsInFirstRow.length || null;
    });

    /** @hidden */
    private readonly _tableService = inject(TableService);

    /** @hidden Injected to activate content density CSS class effects */
    private readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    constructor() {
        // Update cell focusable property when cells or allCellsFocusable changes
        effect(() => {
            const cells = this._cells();
            const allFocusable = this.allCellsFocusable();

            // Set focusable on all cells based on allCellsFocusable or individual cell's focusable state
            cells.forEach((cell) => {
                cell.setFocusable(allFocusable || cell.focusable());
            });
        });

        // Propagate keys to table service when keys input changes
        effect(() => {
            const keys = this.keys();
            if (keys) {
                this._propagateKeys(keys);
            }
        });
    }

    /** Method that sorts and changes visible state of particular cells  */
    reset(keys: string[]): void {
        this._propagateKeys(keys);
    }

    /** @hidden */
    private _propagateKeys(keys: string[]): void {
        if (keys) {
            this._tableService.changeKeys([...keys]);
        }
    }
}

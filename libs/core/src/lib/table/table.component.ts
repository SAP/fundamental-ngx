import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostBinding,
    Input,
    NgZone,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { TableService } from './table.service';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { DestroyedService, FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { first, startWith, takeUntil } from 'rxjs';
import { TableCellDirective } from './directives/table-cell.directive';

export const FdTableContentDensityProviderParams = {
    modifiers: {
        [ContentDensityMode.COMPACT]: 'fd-table--compact',
        [ContentDensityMode.CONDENSED]: 'fd-table--condensed'
    },
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
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TableService, contentDensityObserverProviders(FdTableContentDensityProviderParams)],
    hostDirectives: [FocusableGridDirective]
})
export class TableComponent implements AfterContentInit, AfterViewInit {
    /** @hidden */
    @HostBinding('class.fd-table')
    fdTableClass = true;

    /** Whether or not to show the table's horizontal borders */
    @HostBinding('class.fd-table--no-horizontal-borders')
    @Input()
    noBorderX = false;

    /** Whether or not to show the table's vertical borders */
    @HostBinding('class.fd-table--no-vertical-borders')
    @Input()
    noBorderY = false;

    /** Whether or not to show the table's outer border */
    @HostBinding('class.fd-table--no-outer-border')
    @Input()
    noOuterBorder = false;

    /** Whether or not to show the table's top border */
    @HostBinding('class.fd-table--top-border')
    @Input()
    topBorder = false;

    /** Whether or not to display the table in pop in mode, it also require change of markup */
    @HostBinding('class.fd-table--pop-in')
    @Input()
    popIn = false;

    /** Whether or not to display the table in responsive mode. */
    @HostBinding('class.fd-table--responsive')
    @Input()
    responsive = false;

    /** List of keys that identifies single columns */
    @Input()
    keys: string[];

    /** Applies `focusable` to all cells within this table */
    @Input()
    set allCellsFocusable(value: BooleanInput) {
        this._allCellsFocusable = coerceBooleanProperty(value);

        this._updateCells();
    }
    get allCellsFocusable(): boolean {
        return this._allCellsFocusable;
    }

    /** @hidden */
    @ContentChildren(TableCellDirective, { descendants: true })
    readonly _cells: QueryList<TableCellDirective>;

    /** @hidden */
    private _allCellsFocusable = false;

    /** @hidden */
    constructor(
        private readonly _tableService: TableService,
        private readonly _contentDensityObserver: ContentDensityObserver,
        private readonly _destroy$: DestroyedService,
        private readonly _ngZone: NgZone
    ) {
        this._contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._cells.changes
            .pipe(startWith(this._cells), takeUntil(this._destroy$))
            .subscribe(() => this._updateCells());
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._propagateKeys(this.keys);
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

    /** @hidden */
    private _updateCells(): void {
        this._ngZone.onStable.pipe(first()).subscribe(() => {
            this._cells?.forEach((cell) => (cell.focusable = cell.focusable || this.allCellsFocusable));
        });
    }
}

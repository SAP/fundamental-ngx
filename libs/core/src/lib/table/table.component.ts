import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { TableService } from './table.service';

/**
 * The component that represents a table.
 * A table is a set of tabular data. Line items can support data, images and actions.
 * ```html
 * <table fd-table></table>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'table[fd-table]',
    exportAs: 'fd-table',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ TableService ]
})
export class TableComponent implements AfterViewInit {
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

    /** Whether or not to display the table in compact mode */
    @HostBinding('class.fd-table--compact')
    @Input()
    compact = false;

    /** Whether or not to display the table in condensed mode */
    @HostBinding('class.fd-table--condensed')
    @Input()
    condensed = false;

    /** Whether or not to display the table in pop in mode, it also require change of markup */
    @HostBinding('class.fd-table--pop-in')
    @Input()
    popIn = false;

    /** List of keys that identifies single columns */
    @Input()
    keys: string[];

    constructor (
        private _tableService: TableService
    ) {}

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
}

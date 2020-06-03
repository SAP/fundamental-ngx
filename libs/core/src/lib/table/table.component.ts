import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
    /** @hidden */
    @HostBinding('class.fd-table')
    fdTableClass: boolean = true;

    /** Whether or not to show the table's horizontal borders */
    @HostBinding('class.fd-table--no-horizontal-borders')
    @Input()
    noBorderX: boolean = false;

    /** Whether or not to show the table's vertical borders */
    @HostBinding('class.fd-table--no-vertical-borders')
    @Input()
    noBorderY: boolean = false;

}

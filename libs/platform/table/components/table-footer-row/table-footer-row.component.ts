import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { TableCellDirective, TableRowDirective } from '@fundamental-ngx/core/table';
import { TableService } from '@fundamental-ngx/platform/table-helpers';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-table-footer-row]',
    templateUrl: './table-footer-row.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TableCellDirective, NgTemplateOutlet]
})
export class TableFooterRowComponent extends TableRowDirective {
    /** @hidden */
    readonly _fdpTableService = inject(TableService);
}

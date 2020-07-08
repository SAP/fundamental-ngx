import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { TableResponsiveWrapperDirective } from './directives/table-responsive-wrapper.directive';
import { TableHeaderDirective } from './directives/table-header.directive';
import { TableBodyDirective } from './directives/table-body.directive';
import { TableRowDirective } from './directives/table-row.directive';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableWrapperComponent } from './table-wrapper.component';
import { TableFooterDirective } from './directives/table-footer.directive';
import { TableStatusIndicatorDirective } from './directives/table-status-indicator.directive';
import { TablePopoverDirective } from './directives/table-popover.directive';
import { TableInnerDirective } from './directives/table-inner.directive';
import { TableTextDirective } from './directives/table-text.directive';
import { TableIconDirective } from './directives/table-icon.directive';
import { TableService } from './table.service';

@NgModule({
    imports: [CommonModule],
    declarations: [
        TableComponent,
        TableResponsiveWrapperDirective,
        TableWrapperComponent,
        TableHeaderDirective,
        TableFooterDirective,
        TableBodyDirective,
        TableRowDirective,
        TableCellDirective,
        TableStatusIndicatorDirective,
        TablePopoverDirective,
        TableInnerDirective,
        TableTextDirective,
        TableIconDirective
    ],
    exports: [
        TableComponent,
        TableResponsiveWrapperDirective,
        TableWrapperComponent,
        TableHeaderDirective,
        TableFooterDirective,
        TableBodyDirective,
        TableRowDirective,
        TableCellDirective,
        TableStatusIndicatorDirective,
        TablePopoverDirective,
        TableInnerDirective,
        TableTextDirective,
        TableIconDirective
    ],
    providers: [
        TableService
    ]
})
export class TableModule {}

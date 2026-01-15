import { NgModule } from '@angular/core';

import { TableBodyDirective } from './directives/table-body.directive';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableContainerDirective } from './directives/table-container.directive';
import { TableFixedDirective } from './directives/table-fixed.directive';
import { TableFooterDirective } from './directives/table-footer.directive';
import { TableHeaderDirective } from './directives/table-header.directive';
import { TableIconDirective } from './directives/table-icon.directive';
import { TableInnerDirective } from './directives/table-inner.directive';
import { TablePopoverDirective } from './directives/table-popover.directive';
import { TableResponsiveWrapperDirective } from './directives/table-responsive-wrapper.directive';
import { TableRowDirective } from './directives/table-row.directive';
import { TableStatusIndicatorDirective } from './directives/table-status-indicator.directive';
import { TableTextDirective } from './directives/table-text.directive';
import { TableWrapperComponent } from './table-wrapper.component';
import { TableComponent } from './table.component';
import { TableService } from './table.service';

const components = [
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
    TableIconDirective,
    TableFixedDirective,
    TableContainerDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components],
    providers: [TableService]
})
export class TableModule {}

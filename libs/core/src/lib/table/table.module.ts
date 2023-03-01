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
import { DeprecatedTableCompactDirective } from './deprecated-table-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DeprecatedTableCondensedDirective } from './deprecated-table-condensed.directive';
import { TableFixedDirective } from './directives/table-fixed.directive';

@NgModule({
    imports: [CommonModule, ContentDensityModule],
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
        TableIconDirective,
        TableFixedDirective,
        DeprecatedTableCompactDirective,
        DeprecatedTableCondensedDirective
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
        TableIconDirective,
        TableFixedDirective,
        DeprecatedTableCompactDirective,
        DeprecatedTableCondensedDirective,
        ContentDensityModule
    ],
    providers: [TableService]
})
export class TableModule {}

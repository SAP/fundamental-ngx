import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableWrapperComponent } from './table-wrapper.component';
import { TableComponent } from './table.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TableComponent, TableWrapperComponent],
    exports: [TableComponent, TableWrapperComponent],
    providers: []
})
export class PlatformTableModule {}

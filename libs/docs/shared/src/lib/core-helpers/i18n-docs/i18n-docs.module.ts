import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nDocsComponent } from './i18n-docs.component';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { TableModule } from '@fundamental-ngx/core/table';

@NgModule({
    declarations: [I18nDocsComponent],
    imports: [CommonModule, BusyIndicatorModule, TableModule],
    exports: [I18nDocsComponent]
})
export class I18nDocsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { SelectModule } from './components/select/select.module';

@NgModule({
    imports: [
        CommonModule,
        FundamentalNgxCoreModule
    ], exports: [
        SelectModule
    ]

})
export class FundamentalNgxPlatformModule {
}

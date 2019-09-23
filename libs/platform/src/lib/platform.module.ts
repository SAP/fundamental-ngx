import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { ActionBarModule } from './components/action-bar/actionbar.module'

@NgModule({
    imports: [
        CommonModule,
        FundamentalNgxCoreModule
    ],
    exports: [
        ActionBarModule
    ]
})
export class FundamentalNgxPlatformModule {
}

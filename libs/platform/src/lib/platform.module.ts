import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { PlatformButtonModule } from './components/button/button.module';

@NgModule({
    imports: [
        CommonModule,
        FundamentalNgxCoreModule
    ],
    exports: [PlatformButtonModule]
})
export class FundamentalNgxPlatformModule { }

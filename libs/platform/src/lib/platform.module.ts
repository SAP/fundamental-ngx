import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { PlatformButtonModule } from './components/button/button.module';
import { PlatformSearchInputModule } from './components/search-input/search-input.module';

@NgModule({
    imports: [
        CommonModule,
        PlatformSearchInputModule,
        FundamentalNgxCoreModule
    ],
    exports: [
        PlatformButtonModule,
        PlatformSearchInputModule
    ]
})
export class FundamentalNgxPlatformModule { }

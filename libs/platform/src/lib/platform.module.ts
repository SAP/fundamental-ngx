import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { SearchInput2Component } from './components/search-input/search-input.component';

@NgModule({
    imports: [CommonModule, FundamentalNgxCoreModule],
    declarations: [SearchInput2Component],
    exports: [SearchInput2Component]
})
export class FundamentalNgxPlatformModule {
}

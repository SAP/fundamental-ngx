import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { SearchInput2Component } from './components/search-input/search-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, FundamentalNgxCoreModule],
    declarations: [SearchInput2Component],
    exports: [SearchInput2Component]
})
export class FundamentalNgxPlatformModule {
}

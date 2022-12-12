import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { CxSideNavigationModule } from '@fundamental-ngx/cx/side-navigation';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [CxNestedListModule, CxSideNavigationModule]
})
export class FundamentalNgxCxModule {}

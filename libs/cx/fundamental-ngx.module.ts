import { NgModule } from '@angular/core';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { CxSideNavigationModule } from '@fundamental-ngx/cx/side-navigation';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [],
    declarations: [],
    exports: [CxNestedListModule, CxSideNavigationModule]
})
export class FundamentalNgxCxModule {}

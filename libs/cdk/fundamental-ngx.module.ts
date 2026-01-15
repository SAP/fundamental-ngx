import { NgModule } from '@angular/core';
import { DataSourceModule } from '@fundamental-ngx/cdk/data-source';
import { FormsModule } from '@fundamental-ngx/cdk/forms';
import { UtilsModule } from '@fundamental-ngx/cdk/utils';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [],
    declarations: [],
    exports: [FormsModule, DataSourceModule, UtilsModule]
})
export class FundamentalNgxCdkModule {}

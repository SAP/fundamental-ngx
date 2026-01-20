import { NgModule } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { CheckboxComponent } from './checkbox/checkbox.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ContentDensityModule, CheckboxComponent],
    exports: [CheckboxComponent, ContentDensityModule]
})
export class CheckboxModule {}

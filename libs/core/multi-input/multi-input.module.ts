import { NgModule } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { MultiInputComponent } from './multi-input.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ContentDensityModule, MultiInputComponent],
    exports: [MultiInputComponent, ContentDensityModule]
})
export class MultiInputModule {}

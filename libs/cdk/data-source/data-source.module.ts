import { NgModule } from '@angular/core';
import { DataSourceDirective } from './data-source.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [DataSourceDirective],
    exports: [DataSourceDirective]
})
export class DataSourceModule {}

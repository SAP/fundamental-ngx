import { NgModule } from '@angular/core';
import { DataSourceDirective } from './data-source.directive';

@NgModule({
    imports: [DataSourceDirective],
    exports: [DataSourceDirective]
})
export class DataSourceModule {}

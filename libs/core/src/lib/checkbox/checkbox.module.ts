import { NgModule } from '@angular/core';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DeprecatedCheckboxContentDensityDirective } from './deprecated-checkbox-content-density.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [ContentDensityModule, CheckboxComponent, DeprecatedCheckboxContentDensityDirective],
    exports: [CheckboxComponent, DeprecatedCheckboxContentDensityDirective, ContentDensityModule]
})
export class CheckboxModule {}

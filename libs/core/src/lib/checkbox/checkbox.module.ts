import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';
import { DeprecatedCheckboxContentDensityDirective } from './deprecated-checkbox-content-density.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [CheckboxComponent, DeprecatedCheckboxContentDensityDirective],
    imports: [CommonModule, FormsModule, ContentDensityModule],
    exports: [CheckboxComponent, DeprecatedCheckboxContentDensityDirective, ContentDensityModule]
})
export class CheckboxModule {}

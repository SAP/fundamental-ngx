import { NgModule } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
    imports: [ContentDensityModule, CheckboxComponent],
    exports: [CheckboxComponent, ContentDensityModule]
})
export class CheckboxModule {}

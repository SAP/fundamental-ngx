import { NgModule } from '@angular/core';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [ContentDensityModule, CheckboxComponent],
    exports: [CheckboxComponent, ContentDensityModule]
})
export class CheckboxModule {}

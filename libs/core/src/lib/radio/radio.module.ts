import { NgModule } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { RadioButtonComponent } from './radio-button/radio-button.component';

/**
 * @deprecated
 * Use direct import of `RadioButtonComponent`.
 */
@NgModule({
    exports: [RadioButtonComponent, ContentDensityModule],
    imports: [RadioButtonComponent, ContentDensityModule]
})
export class RadioModule {}

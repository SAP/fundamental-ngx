import { NgModule } from '@angular/core';

import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { StepInputComponent } from './step-input.component';

@NgModule({
    imports: [StepInputComponent, ContentDensityModule],
    exports: [StepInputComponent, ContentDensityModule]
})
export class StepInputModule {}

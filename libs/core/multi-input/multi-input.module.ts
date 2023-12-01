import { NgModule } from '@angular/core';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { MultiInputComponent } from './multi-input.component';

@NgModule({
    imports: [ContentDensityModule, MultiInputComponent],
    exports: [MultiInputComponent, ContentDensityModule]
})
export class MultiInputModule {}

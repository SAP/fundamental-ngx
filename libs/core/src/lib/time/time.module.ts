import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeComponent } from './time.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormModule } from '@fundamental-ngx/core/form';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { TimeColumnComponent } from './time-column/time-column.component';
import { CarouselModule } from '@fundamental-ngx/core/carousel';
import { DeprecatedTimeContentDensityDirective } from './deprecated-time-content-density.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [TimeComponent, TimeColumnComponent, DeprecatedTimeContentDensityDirective],
    imports: [CommonModule, FormsModule, FormModule, ButtonModule, PipeModule, CarouselModule, ContentDensityModule],
    exports: [TimeComponent, TimeColumnComponent, DeprecatedTimeContentDensityDirective, ContentDensityModule]
})
export class TimeModule {}

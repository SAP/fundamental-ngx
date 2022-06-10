import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentDensityDirective } from './directives/content-density.directive';

@NgModule({
    imports: [CommonModule],
    exports: [ContentDensityDirective],
    declarations: [ContentDensityDirective]
})
export class ContentDensityModule {}

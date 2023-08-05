import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformContentDensityDeprecationDirective } from './directives/platform-content-density-deprecation.directive';

@NgModule({
    declarations: [PlatformContentDensityDeprecationDirective],
    imports: [CommonModule],
    exports: [PlatformContentDensityDeprecationDirective]
})
export class PlatformContentDensityDeprecationsModule {}

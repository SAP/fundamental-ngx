import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformContentDensityDeprecationDirective } from './directives/platform-content-density-deprecation.directive';
import { PlatformCompactDeprecationDirective } from './directives/platform-compact-deprecation.directive';

@NgModule({
    declarations: [PlatformContentDensityDeprecationDirective, PlatformCompactDeprecationDirective],
    imports: [CommonModule],
    exports: [PlatformContentDensityDeprecationDirective, PlatformCompactDeprecationDirective]
})
export class PlatformContentDensityDeprecationsModule {}

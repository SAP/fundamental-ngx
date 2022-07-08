import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

import { BarComponent } from './bar.component';
import { BarLeftDirective } from './directives/bar-left.directive';
import { BarMiddleDirective } from './directives/bar-middle.directive';
import { BarRightDirective } from './directives/bar-right.directive';
import { BarElementDirective } from './directives/bar-element.directive';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { DeprecatedBarContentDensityDirective } from './deprecated-bar-content-density.directive';
import { DeprecatedBarButtonContentDensityDirective } from './deprecated-bar-button-content-density.directive';

@NgModule({
    declarations: [
        BarComponent,
        BarLeftDirective,
        BarMiddleDirective,
        BarRightDirective,
        BarElementDirective,
        ButtonBarComponent,
        DeprecatedBarContentDensityDirective,
        DeprecatedBarButtonContentDensityDirective
    ],
    imports: [CommonModule, ButtonModule, ContentDensityModule],
    exports: [
        BarComponent,
        BarLeftDirective,
        BarMiddleDirective,
        BarRightDirective,
        BarElementDirective,
        ButtonBarComponent,
        DeprecatedBarContentDensityDirective,
        DeprecatedBarButtonContentDensityDirective,
        ContentDensityModule
    ]
})
export class BarModule {}

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

@NgModule({
    declarations: [
        BarComponent,
        BarLeftDirective,
        BarMiddleDirective,
        BarRightDirective,
        BarElementDirective,
        ButtonBarComponent
    ],
    imports: [CommonModule, ButtonModule, ContentDensityModule],
    exports: [
        BarComponent,
        BarLeftDirective,
        BarMiddleDirective,
        BarRightDirective,
        BarElementDirective,
        ButtonBarComponent,
        ContentDensityModule
    ]
})
export class BarModule {}

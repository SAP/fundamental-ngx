import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarComponent } from './bar.component';
import { BarLeftDirective } from './directives/bar-left.directive';
import { BarMiddleDirective } from './directives/bar-middle.directive';
import { BarRightDirective } from './directives/bar-right.directive';
import { BarElementDirective } from './directives/bar-element.directive';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { ButtonModule } from '@fundamental-ngx/core/button';

@NgModule({
    declarations: [BarComponent, BarLeftDirective, BarMiddleDirective, BarRightDirective, BarElementDirective, ButtonBarComponent],
    imports: [CommonModule, ButtonModule],
    exports: [BarComponent, BarLeftDirective, BarMiddleDirective, BarRightDirective, BarElementDirective, ButtonBarComponent]
})
export class BarModule {}

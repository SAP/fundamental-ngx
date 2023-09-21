import { NgModule } from '@angular/core';

import { BarComponent } from './bar.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { BarElementDirective } from './directives/bar-element.directive';
import { BarLeftDirective } from './directives/bar-left.directive';
import { BarMiddleDirective } from './directives/bar-middle.directive';
import { BarRightDirective } from './directives/bar-right.directive';

const components = [
    BarComponent,
    BarLeftDirective,
    BarMiddleDirective,
    BarRightDirective,
    BarElementDirective,
    ButtonBarComponent
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [components],
    exports: [components]
})
export class BarModule {}

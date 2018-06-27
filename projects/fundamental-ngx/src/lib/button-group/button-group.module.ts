import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonGroupComponent } from './button-group.component';
import { ButtonGroupedDirective } from './button-grouped.directive';

@NgModule({
    imports: [CommonModule],
    exports: [ButtonGroupComponent, ButtonGroupedDirective],
    declarations: [ButtonGroupComponent, ButtonGroupedDirective]
})
export class ButtonGroupModule {}

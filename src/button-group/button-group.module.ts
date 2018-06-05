import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonGroupComponent, ButtonGroupedDirective } from './button-group.component';

@NgModule({
    imports: [CommonModule],
    exports: [ButtonGroupComponent, ButtonGroupedDirective],
    declarations: [ButtonGroupComponent, ButtonGroupedDirective]
})
export class ButtonGroupModule {}

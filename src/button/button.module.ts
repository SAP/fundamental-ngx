import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDirective } from './button.directive';

@NgModule({
    imports: [CommonModule],
    exports: [ButtonDirective],
    declarations: [ButtonDirective]
})
export class ButtonModule {}

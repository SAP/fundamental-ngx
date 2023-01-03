import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RepeatDirective } from './repeat.directive';

@NgModule({
    declarations: [RepeatDirective],
    imports: [CommonModule],
    exports: [RepeatDirective]
})
export class RepeatModule {}

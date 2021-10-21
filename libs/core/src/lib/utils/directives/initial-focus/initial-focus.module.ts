import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialFocusDirective } from './initial-focus.directive';

@NgModule({
    imports: [CommonModule],
    exports: [InitialFocusDirective],
    declarations: [InitialFocusDirective]
})
export class InitialFocusModule {}

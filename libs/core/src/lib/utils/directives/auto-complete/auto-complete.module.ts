import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteDirective } from './auto-complete.directive';

@NgModule({
    imports: [CommonModule],
    exports: [AutoCompleteDirective],
    declarations: [AutoCompleteDirective]
})
export class AutoCompleteModule {}

import { NgModule } from '@angular/core';
import { AutoCompleteDirective } from './auto-complete.directive';

@NgModule({
    imports: [AutoCompleteDirective],
    exports: [AutoCompleteDirective],
    declarations: []
})
export class AutoCompleteModule {}

import { NgModule } from '@angular/core';
import { AutoCompleteDirective, DeprecatedAutoCompleteDirective } from './auto-complete.directive';

@NgModule({
    imports: [AutoCompleteDirective, DeprecatedAutoCompleteDirective],
    exports: [AutoCompleteDirective, DeprecatedAutoCompleteDirective],
    declarations: []
})
export class AutoCompleteModule {}

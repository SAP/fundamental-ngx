import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteDirective } from './auto-complete.directive';

@NgModule({
    declarations: [AutoCompleteDirective],
    imports: [CommonModule],
    exports: [AutoCompleteDirective]
})
export class PlatformAutoCompleteModule {}

import { NgModule } from '@angular/core';

import { InlineHelpDirective } from './inline-help.directive';

@NgModule({
    imports: [InlineHelpDirective],
    exports: [InlineHelpDirective]
})
export class InlineHelpModule {}

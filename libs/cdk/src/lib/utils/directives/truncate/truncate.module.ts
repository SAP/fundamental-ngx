import { NgModule } from '@angular/core';

import { TruncateDirective } from './truncate.directive';

@NgModule({
    imports: [TruncateDirective],
    exports: [TruncateDirective]
})
export class TruncateModule {}

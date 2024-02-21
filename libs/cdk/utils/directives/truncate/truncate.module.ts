import { NgModule } from '@angular/core';

import { TruncateDirective, TruncateTitleDirective } from './truncate.directive';

@NgModule({
    imports: [TruncateDirective, TruncateTitleDirective],
    exports: [TruncateDirective, TruncateTitleDirective]
})
export class TruncateModule {}

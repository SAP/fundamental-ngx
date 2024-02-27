import { NgModule } from '@angular/core';

import { TruncateDirective, TruncatedTitleDirective } from './truncate.directive';

@NgModule({
    imports: [TruncateDirective, TruncatedTitleDirective],
    exports: [TruncateDirective, TruncatedTitleDirective]
})
export class TruncateModule {}

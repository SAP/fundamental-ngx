import { NgModule } from '@angular/core';

import { TruncateDirective, DeprecatedTruncateSelectorDirective, TruncateTitleDirective } from './truncate.directive';

@NgModule({
    imports: [TruncateDirective, TruncateTitleDirective, DeprecatedTruncateSelectorDirective],
    exports: [TruncateDirective, TruncateTitleDirective, DeprecatedTruncateSelectorDirective]
})
export class TruncateModule {}

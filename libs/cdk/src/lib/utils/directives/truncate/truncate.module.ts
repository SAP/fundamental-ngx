import { NgModule } from '@angular/core';

import { TruncateDirective, DeprecatedTruncateSelectorDirective, TruncatedTitleDirective } from './truncate.directive';

@NgModule({
    imports: [TruncateDirective, TruncatedTitleDirective, DeprecatedTruncateSelectorDirective],
    exports: [TruncateDirective, TruncatedTitleDirective, DeprecatedTruncateSelectorDirective]
})
export class TruncateModule {}

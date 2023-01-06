import { NgModule } from '@angular/core';

import { TruncateDirective, DeprecatedTruncateSelectorDirective } from './truncate.directive';

@NgModule({
    imports: [TruncateDirective, DeprecatedTruncateSelectorDirective],
    exports: [TruncateDirective, DeprecatedTruncateSelectorDirective]
})
export class TruncateModule {}

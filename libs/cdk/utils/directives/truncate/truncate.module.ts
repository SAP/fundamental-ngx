import { NgModule } from '@angular/core';

import { TruncateDirective, TruncatedTitleDirective } from './truncate.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [TruncateDirective, TruncatedTitleDirective],
    exports: [TruncateDirective, TruncatedTitleDirective]
})
export class TruncateModule {}

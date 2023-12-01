import { NgModule } from '@angular/core';

import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';
import { SplitButtonComponent } from './split-button.component';

/**
 * @deprecated
 * Use individual component imports.
 */
@NgModule({
    imports: [SplitButtonComponent, SplitButtonActionTitle],
    exports: [SplitButtonComponent, SplitButtonActionTitle]
})
export class SplitButtonModule {}

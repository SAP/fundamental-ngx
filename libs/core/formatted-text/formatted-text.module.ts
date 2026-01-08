import { NgModule } from '@angular/core';

import { FormattedTextComponent } from './formatted-text.component';

/**
 * @deprecated
 * Import `FormattedTextComponent` directly as a standalone component.
 * This module will be removed in a future version.
 */
@NgModule({
    exports: [FormattedTextComponent],
    imports: [FormattedTextComponent]
})
export class FormattedTextModule {}

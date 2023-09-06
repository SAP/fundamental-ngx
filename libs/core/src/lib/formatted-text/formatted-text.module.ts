import { NgModule } from '@angular/core';

import { FormattedTextComponent } from './formatted-text.component';

/**
 * @deprecated
 * Import `FormattedTextComponent` directly as a standalone component.
 */
@NgModule({
    exports: [FormattedTextComponent],
    imports: [FormattedTextComponent]
})
export class FormattedTextModule {}

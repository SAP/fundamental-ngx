import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormattedTextComponent } from './formatted-text.component';

@NgModule({
    exports: [FormattedTextComponent],
    imports: [CommonModule, FormattedTextComponent]
})
export class FormattedTextModule {}

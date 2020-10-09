import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormattedTextComponent } from './formatted-text.component';

@NgModule({
    declarations: [FormattedTextComponent],
    exports: [FormattedTextComponent],
    imports: [CommonModule]
})
export class FormattedTextModule {}

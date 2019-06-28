import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitButtonComponent } from './split-button.component';
import { ButtonModule } from '../button';
import { PopoverModule } from '../popover';
import { SplitButtonActionTitle, SplitButtonLoadActionTitle, SplitButtonMenuDirective } from './split-button-utils/split-button.directives';

@NgModule({
    imports: [CommonModule, ButtonModule, PopoverModule],
    declarations: [SplitButtonComponent, SplitButtonMenuDirective, SplitButtonActionTitle, SplitButtonLoadActionTitle],
    exports: [SplitButtonComponent, SplitButtonMenuDirective, SplitButtonActionTitle, SplitButtonLoadActionTitle]
})
export class SplitButtonModule {}

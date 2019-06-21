import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonSplitComponent } from './button-split.component';
import { ButtonModule } from '../button';
import { PopoverModule } from '../popover';
import { ButtonSplitActionTitle, ButtonSplitLoadActionTitle, ButtonSplitMenuDirective } from './button-split-utils/button-split.directives';

@NgModule({
    imports: [CommonModule, ButtonModule, PopoverModule],
    exports: [ButtonSplitComponent, ButtonSplitMenuDirective, ButtonSplitActionTitle, ButtonSplitLoadActionTitle],
    declarations: [ButtonSplitComponent, ButtonSplitMenuDirective, ButtonSplitActionTitle, ButtonSplitLoadActionTitle]
})
export class ButtonSplitModule {}

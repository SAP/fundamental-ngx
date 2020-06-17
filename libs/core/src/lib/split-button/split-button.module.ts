import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitButtonComponent } from './split-button.component';
import { ButtonModule } from '../button/button.module';
import {
    SplitButtonActionTitle,
} from './split-button-utils/split-button.directives';
import { MenuModule } from '../menu/menu.module';

@NgModule({
    imports: [CommonModule, ButtonModule, MenuModule],
    declarations: [SplitButtonComponent, SplitButtonActionTitle],
    exports: [SplitButtonComponent, SplitButtonActionTitle]
})
export class SplitButtonModule {}

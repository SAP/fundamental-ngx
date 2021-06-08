import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitButtonComponent } from './split-button.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import {
    SplitButtonActionTitle,
} from './split-button-utils/split-button.directives';
import { MenuModule } from '@fundamental-ngx/core/menu';

@NgModule({
    imports: [CommonModule, ButtonModule, MenuModule],
    declarations: [SplitButtonComponent, SplitButtonActionTitle],
    exports: [SplitButtonComponent, SplitButtonActionTitle]
})
export class SplitButtonModule {}

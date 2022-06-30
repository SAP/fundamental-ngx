import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitButtonComponent } from './split-button.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { I18nModule } from '@fundamental-ngx/i18n';
import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';
import { MenuModule } from '@fundamental-ngx/core/menu';

@NgModule({
    imports: [CommonModule, ButtonModule, MenuModule, I18nModule],
    declarations: [SplitButtonComponent, SplitButtonActionTitle],
    exports: [SplitButtonComponent, SplitButtonActionTitle]
})
export class SplitButtonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitButtonComponent } from './split-button.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { I18nModule } from '@fundamental-ngx/i18n';
import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, ButtonModule, MenuModule, ContentDensityModule, I18nModule],
    declarations: [SplitButtonComponent, SplitButtonActionTitle, ],
    exports: [SplitButtonComponent, SplitButtonActionTitle, ContentDensityModule, ]
})
export class SplitButtonModule {}

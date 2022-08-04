import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { SelectModule } from '@fundamental-ngx/core/select';
import { FormModule } from '@fundamental-ngx/core/form';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { OnlyDigitsModule, FocusKeyManagerHelpersModule } from '@fundamental-ngx/core/utils';
import { I18nModule } from '@fundamental-ngx/i18n';

import { PaginationComponent } from './pagination.component';
import { PaginationService } from './pagination.service';
import { DeprecatedPaginationCompactDirective } from './deprecated-pagination-compact.directive';

@NgModule({
    declarations: [PaginationComponent, DeprecatedPaginationCompactDirective],
    imports: [
        CommonModule,
        ButtonModule,
        IconModule,
        SelectModule,
        I18nModule,
        FormsModule,
        FormModule,
        OnlyDigitsModule,
        FocusKeyManagerHelpersModule,
        ContentDensityModule
    ],
    providers: [PaginationService],
    exports: [PaginationComponent, DeprecatedPaginationCompactDirective]
})
export class PaginationModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { FormModule } from '@fundamental-ngx/core/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformObjectStatusModule } from '@fundamental-ngx/platform/object-status';
import { StandardListItemComponent } from './standard-list-item.component';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [StandardListItemComponent],
    imports: [
        CommonModule,
        IconModule,
        FormsModule,
        CheckboxModule,
        FormModule,
        RadioModule,
        PipeModule,
        I18nModule,
        ButtonModule,
        PlatformLinkModule,
        ListModule,
        AvatarModule,
        RouterModule,
        PlatformObjectStatusModule,
        ContentDensityModule
    ],
    exports: [StandardListItemComponent, ContentDensityModule]
})
export class StandardListItemModule {}

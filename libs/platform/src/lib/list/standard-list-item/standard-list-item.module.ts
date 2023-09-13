import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormModule } from '@fundamental-ngx/core/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { ObjectStatusComponent } from '@fundamental-ngx/platform/object-status';
import { StandardListItemComponent } from './standard-list-item.component';

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
        ObjectStatusComponent,
        ContentDensityModule
    ],
    exports: [StandardListItemComponent, ContentDensityModule]
})
export class StandardListItemModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormModule } from '@fundamental-ngx/core/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectIdentifierModule } from '@fundamental-ngx/core/object-identifier';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformObjectAttributeModule } from '@fundamental-ngx/platform/object-attribute';
import { ObjectStatusComponent } from '@fundamental-ngx/platform/object-status';
import { ObjectListItemRowComponent } from './object-list-item-row.component';
import { ObjectListItemComponent } from './object-list-item.component';

@NgModule({
    declarations: [ObjectListItemComponent, ObjectListItemRowComponent],
    imports: [
        CommonModule,
        IconModule,
        FormsModule,
        FormModule,
        ListModule,
        PipeModule,
        PlatformLinkModule,
        RouterModule,
        AvatarComponent,
        ObjectStatusComponent,
        CheckboxModule,
        RadioModule,
        I18nModule,
        ObjectMarkerModule,
        ObjectNumberModule,
        ObjectIdentifierModule,
        PlatformObjectAttributeModule,
        ButtonModule,
        ContentDensityModule
    ],
    exports: [ObjectListItemComponent, ObjectListItemRowComponent, ContentDensityModule]
})
export class ObjectListItemModule {}

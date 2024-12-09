import { ChangeDetectionStrategy, Component, ViewEncapsulation, forwardRef } from '@angular/core';

import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { FormItemComponent } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
import {
    ListItemComponent,
    ListLinkDirective,
    ListSecondaryDirective,
    ListThumbnailDirective,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { ObjectStatusComponent } from '@fundamental-ngx/platform/object-status';
import { BaseListItem } from '../base-list-item';

@Component({
    selector: 'fdp-standard-list-item',
    templateUrl: './standard-list-item.component.html',
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => StandardListItemComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        role: 'none'
    },
    imports: [
        ListItemComponent,
        NgTemplateOutlet,
        ListLinkDirective,
        RouterLink,
        ListTitleDirective,
        IconComponent,
        AvatarComponent,
        NgClass,
        ListSecondaryDirective,
        ListThumbnailDirective,
        FormItemComponent,
        CheckboxComponent,
        FormsModule,
        RadioButtonComponent,
        ButtonComponent,
        ObjectStatusComponent,
        FdTranslatePipe,
        AsyncPipe
    ]
})
export class StandardListItemComponent extends BaseListItem {}

import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';

import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
    ListItemComponent,
    ListLinkDirective,
    ListSecondaryDirective,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { BaseListItem } from '../base-list-item';

@Component({
    selector: 'fdp-display-list-item',
    templateUrl: './display-list-item.component.html',
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => DisplayListItemComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'none'
    },
    imports: [
        ListItemComponent,
        ListLinkDirective,
        RouterLink,
        NgTemplateOutlet,
        ListTitleDirective,
        NgClass,
        ListSecondaryDirective,
        AsyncPipe
    ]
})
export class DisplayListItemComponent extends BaseListItem {}

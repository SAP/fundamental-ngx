import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';

import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
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
    standalone: true,
    imports: [
        NgIf,
        ListItemComponent,
        ListLinkDirective,
        RouterLink,
        NgTemplateOutlet,
        ListTitleDirective,
        NgClass,
        ListSecondaryDirective
    ]
})
export class DisplayListItemComponent extends BaseListItem {}

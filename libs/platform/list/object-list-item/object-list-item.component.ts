import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    forwardRef,
    Input,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ColorAccent } from '@fundamental-ngx/cdk/utils';

import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { FormItemComponent } from '@fundamental-ngx/core/form';
import { ListItemComponent, ListLinkDirective, ListTitleDirective } from '@fundamental-ngx/core/list';
import { ObjectIdentifierComponent } from '@fundamental-ngx/core/object-identifier';
import { ObjectNumberComponent } from '@fundamental-ngx/core/object-number';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { BaseListItem, StatusType } from '../base-list-item';
import { ObjectListItemRowComponent } from './object-list-item-row.component';

@Component({
    selector: 'fdp-object-list-item',
    templateUrl: './object-list-item.component.html',
    styleUrl: './object-list-item.component.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => ObjectListItemComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'none'
    },
    imports: [
        ListItemComponent,
        NgTemplateOutlet,
        ListLinkDirective,
        RouterLink,
        ListTitleDirective,
        AvatarComponent,
        ObjectIdentifierComponent,
        ObjectNumberComponent,
        FormItemComponent,
        CheckboxComponent,
        FormsModule,
        RadioButtonComponent,
        ButtonComponent,
        FdTranslatePipe,
        AsyncPipe
    ]
})
export class ObjectListItemComponent extends BaseListItem {
    /** define label for screen reader */
    @Input()
    introductionText: string;

    /** holds object number */
    @Input()
    amount: number;

    /** holds object number unit */
    @Input()
    currency: string;

    /** object number amount decimal limitation */
    @Input()
    decimal: number;

    /** object number status */
    @Input()
    numberStatus: StatusType;

    /** holds avatar label */
    @Input()
    label: string;

    /** holds avatar icon as image */
    @Input()
    glyph: string;

    /** Avatar to be circle or not */
    @Input()
    circle: boolean;

    /** Is avatar has placeholder */
    @Input()
    placeholder: boolean;

    /** Is avatar has tile */
    @Input()
    tile: boolean;

    /** Is avatar has colorAccent */
    @Input()
    colorAccent: ColorAccent;

    /** Avatar image path */
    @Input()
    image: string;

    /** Avatar is transparent */
    @Input()
    transparent: boolean;

    /** @hidden */
    @ContentChildren(ObjectListItemRowComponent)
    children: QueryList<ObjectListItemRowComponent>;
}

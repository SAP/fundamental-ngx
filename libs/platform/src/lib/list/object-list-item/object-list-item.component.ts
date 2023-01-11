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

import { BaseListItem, StatusType } from '../base-list-item';
import { ObjectListItemRowComponent } from './object-list-item-row.component';

@Component({
    selector: 'fdp-object-list-item',
    templateUrl: './object-list-item.component.html',
    styleUrls: ['./object-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => ObjectListItemComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush
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

import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { BaseListItem } from '../base-list-item';

@Component({
    selector: 'fdp-free-content-list-item',
    templateUrl: './free-content-list-item.component.html',
    styleUrls: ['./free-content-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => FreeContentListItemComponent) }]
})
export class FreeContentListItemComponent extends BaseListItem {}

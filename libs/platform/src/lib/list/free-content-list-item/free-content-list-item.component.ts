import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { BaseListItem } from '../base-list-item';

@Component({
    selector: 'fdp-free-content-list-item, li[fdp-free-content-list-item]',
    templateUrl: './free-content-list-item.component.html',
    styleUrls: ['./free-content-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => FreeContentListItemComponent) }],
    host: {
        role: 'group'
    }
})
export class FreeContentListItemComponent extends BaseListItem {
    /** Role of the child fd-list-item element. */
    @Input()
    ariaRole: string;
}

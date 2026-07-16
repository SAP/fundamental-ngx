import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk';
import { ListItemComponent } from '@fundamental-ngx/core/list';
import { BaseListItem } from '../base-list-item';

@Component({
    selector: 'fdp-free-content-list-item, li[fdp-free-content-list-item]',
    templateUrl: './free-content-list-item.component.html',
    styleUrl: './free-content-list-item.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => FreeContentListItemComponent) }],
    imports: [ListItemComponent, AsyncPipe]
})
export class FreeContentListItemComponent extends BaseListItem {
    /**
     * The ARIA role of the fdp-free-content-list-item.
     */
    @Input()
    @HostBinding('attr.role')
    role: Nullable<string>;

    /**
     * The ARIA role of the fd-list-item.
     */
    @Input()
    listItemRole: Nullable<string>;
}

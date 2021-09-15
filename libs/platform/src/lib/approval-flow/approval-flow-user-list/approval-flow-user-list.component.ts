import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';

import { BaseListItem, ListComponent, SelectionChangeEvent, StandardListItemComponent } from '@fundamental-ngx/platform/list';
import { ApprovalUser } from '../interfaces';
import { trackByFn } from '../helpers';

@Component({
    selector: 'fdp-approval-flow-user-list',
    templateUrl: './approval-flow-user-list.component.html',
    styleUrls: ['./approval-flow-user-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fdp-approval-flow-user-list'
    }
})
export class ApprovalFlowUserListComponent implements AfterViewInit {
    @Input()
    users: ApprovalUser[] = [];

    @Input()
    selectedUsers: ApprovalUser[] = [];

    @Input()
    isSelectable = true;

    @Output()
    onUserClick = new EventEmitter<ApprovalUser>();

    @Output()
    onSelectionChange = new EventEmitter<ApprovalUser[]>();

    @ViewChild(ListComponent)
    list: ListComponent;

    @ViewChildren(StandardListItemComponent)
    listItems: QueryList<StandardListItemComponent>;

    /** @hidden */
    _selectedItems: BaseListItem[] = [];

    /** @hidden */
    _idPrefix = 'approval-node-user-';

    /** @hidden */
    _trackByFn = trackByFn;

    /** @hidden */
    constructor(private _cdr: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.selectedUsers.length) {
            const selectedApproversNames = this.selectedUsers.map(approver => approver.name);

            this._selectedItems = this.listItems
                .filter(item => selectedApproversNames.includes(item.avatarTitle));

            this._selectedItems.forEach(item => {
                item._selected = true;
                this.list._selectItem(item);
            });

            this._cdr.detectChanges();
        }
    }

    /** @hidden */
    _onSelect(event: SelectionChangeEvent): void {
        this._selectedItems = event.selectedItems;

        this.onSelectionChange.emit(this._getUsersFromSelectedItems(event.selectedItems));
    }

    /** @hidden */
    private _getUsersFromSelectedItems(items: BaseListItem[]): ApprovalUser[] {
        return items.map(item =>
            this.users.find(user => `${this._idPrefix + user.id}` === item.itemEl.nativeElement.id)
        );
    }
}

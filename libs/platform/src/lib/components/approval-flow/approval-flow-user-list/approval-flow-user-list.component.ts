import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApprovalUser, BaseListItem, SelectionChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-approval-flow-user-list',
    templateUrl: './approval-flow-user-list.component.html',
    styleUrls: ['./approval-flow-user-list.component.scss']
})
export class ApprovalFlowUserListComponent {
    @Input() users: ApprovalUser[] = [];

    @Output() onUserClick = new EventEmitter<ApprovalUser>();

    @Output() onSelectionChange = new EventEmitter<ApprovalUser[]>();

    /** @hidden */
    _selectedItems: BaseListItem[] = [];

    /** @hidden */
    _idPrefix = 'approval-node-user-';

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

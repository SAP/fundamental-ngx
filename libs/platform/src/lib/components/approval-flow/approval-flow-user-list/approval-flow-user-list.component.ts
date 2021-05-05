import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { ApprovalUser } from '../interfaces';
import { BaseListItem, ListComponent, SelectionChangeEvent } from '../../list/public_api';
import { StandardListItemComponent } from '../../list/standard-list-item/standard-list-item.component';
import { trackByFn } from '../helpers';

@Component({
    selector: 'fdp-approval-flow-user-list',
    templateUrl: './approval-flow-user-list.component.html',
    styleUrls: ['./approval-flow-user-list.component.scss']
})
export class ApprovalFlowUserListComponent implements AfterViewInit {
    @Input() users: ApprovalUser[] = [];
    @Input() selectedUsers: ApprovalUser[] = [];
    @Input() isSelectable = true;

    @Output() onUserClick = new EventEmitter<ApprovalUser>();
    @Output() onSelectionChange = new EventEmitter<ApprovalUser[]>();

    @ViewChild(ListComponent) list: ListComponent;
    @ViewChildren(StandardListItemComponent) listItems: QueryList<StandardListItemComponent>;

    /** @hidden */
    _selectedItems: BaseListItem[] = [];

    /** @hidden */
    _idPrefix = 'approval-node-user-';

    /** @hidden */
    _trackByFn = trackByFn;

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

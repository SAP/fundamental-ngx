import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { DialogRef } from '@fundamental-ngx/core';

import { Observable } from 'rxjs';

import { ApprovalDataSource, ApprovalNode, ApprovalUser } from '../public_api';

interface DialogRefData {
    node?: ApprovalNode;
    watcher?: ApprovalUser;
    approvalFlowDataSource: ApprovalDataSource;
    userDetailsTemplate: TemplateRef<any>;
    rtl: boolean;
}

@Component({
    selector: 'fdp-approval-flow-user-details',
    templateUrl: './approval-flow-user-details.component.html',
    styleUrls: ['./approval-flow-user-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalFlowUserDetailsComponent implements OnInit {
    /** @hidden */
    _isListMode = false;

    /** @hidden */
    _listItems: ApprovalUser[] = [];

    /** @hidden */
    _selectedItems: any[] = [];

    /** @hidden */
    _userToShowDetails: ApprovalUser;

    /** @hidden */
    _userToShowDetailsData$: Observable<any>;

    /** @hidden */
    _listItemIdPrefix = 'approval-node-user-';

    constructor(public dialogRef: DialogRef, private _cdr: ChangeDetectorRef) {
    }

    /** @hidden */
    get _data(): DialogRefData {
        return this.dialogRef.data;
    }

    /** @hidden */
    ngOnInit(): void {
        this._isListMode = this._data.node?.approvers.length > 1;
        if (this._isListMode) {
            this._setListItems(this._data.node.approvers);
        } else {
            this._setUserToShowDetails(this._data.watcher || this._data.node?.approvers[0]);
        }
    }

    /** @hidden */
    _setListItems(items: ApprovalUser[]): void {
        this._listItems = [...items];
        this._cdr.detectChanges();
    }

    /** @hidden */
    _backToListFromDetails(): void {
        this._userToShowDetails = undefined;
    }

    /** @hidden */
    _setUserToShowDetails(user: ApprovalUser): void {
        this._userToShowDetails = user;
        this._userToShowDetailsData$ = this._data.approvalFlowDataSource.fetchUser(user.id);
    }

    /** @hidden */
    _sendReminder(): void {
        const reminderTargets = this._isListMode ? this._getUsersFromSelectedItems() : this._data.node.approvers;
        this.dialogRef.close(reminderTargets);
    }

    /** @hidden */
    _getUsersFromSelectedItems(): ApprovalUser[] {
        return this._selectedItems.map(item => {
            return this._data.node.approvers.find(user => `${this._listItemIdPrefix + user.id}` === item.itemEl.nativeElement.id);
        });
    }

    /** @hidden */
    _onSearchStringChange(searchString: string): void {
        this._selectedItems = [];
        if (!searchString) {
            this._setListItems(this._data.node.approvers);
            return;
        }

        this._setListItems(this._data.node.approvers.filter(
            user => user.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1
        ));
    }
}

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { ApprovalDataSource, ApprovalNode, ApprovalUser } from '../public_api';
import { filterByName } from '../helpers';

interface DialogRefData {
    node?: ApprovalNode;
    watcher?: ApprovalUser;
    allowSendReminder?: boolean;
    approvalFlowDataSource: ApprovalDataSource;
    userDetailsTemplate: TemplateRef<any>;
    rtl?: boolean;
}

@Component({
    selector: 'fdp-approval-flow-approver-details',
    templateUrl: './approval-flow-approver-details.component.html',
    styleUrls: ['../styles/approval-flow-dialog.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fdp-approval-flow-dialog fdp-approval-flow-approver-details'
    }
})
export class ApprovalFlowApproverDetailsComponent implements OnInit {
    /** @hidden */
    _isListMode = false;

    /** @hidden */
    _listItems: ApprovalUser[] = [];

    /** @hidden */
    _selectedUsers: ApprovalUser[] = [];

    /** @hidden */
    _userToShowDetails: ApprovalUser;

    /** @hidden */
    _userToShowDetailsData$: Observable<any>;

    /** @hidden */
    constructor(public dialogRef: DialogRef, private _cdr: ChangeDetectorRef) {}

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
            this._seeUserDetails(this._data.watcher || this._data.node?.approvers[0]);
        }
    }

    /** @hidden */
    _setListItems(items: ApprovalUser[]): void {
        this._listItems = [...items];
        this._cdr.detectChanges();
    }

    /** @hidden */
    _exitUserDetailsMode(): void {
        this._userToShowDetails = undefined;
        this._isListMode = true;
    }

    /** @hidden */
    _seeUserDetails(user: ApprovalUser): void {
        this._userToShowDetails = user;
        this._userToShowDetailsData$ = this._data.approvalFlowDataSource.fetchUser(user.id);
        this._isListMode = false;
        this._selectedUsers = [];
        this._cdr.detectChanges();
    }

    /** @hidden */
    _sendReminder(): void {
        const reminderTargets = this._isListMode ? this._selectedUsers : this._data.node.approvers;
        this.dialogRef.close(reminderTargets);
    }

    /** @hidden */
    _onSearchStringChange(searchString: string): void {
        if (!searchString) {
            this._setListItems(this._data.node.approvers);
            return;
        }

        this._setListItems(this._data.node.approvers.filter((user) => filterByName(user, searchString)));
    }
}

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    TemplateRef
} from '@angular/core';
import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

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

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef, private _cdr: ChangeDetectorRef) {
    }

    /** @hidden */
    ngOnInit(): void {
        this._isListMode = this.data.node?.approvers.length > 1;
        if (this._isListMode) {
            this.setListItems(this.data.node.approvers);
        } else {
            this.setUserToShowDetails(this.data.watcher || this.data.node?.approvers[0]);
        }
    }

    /** @hidden */
    setListItems(items: ApprovalUser[]): void {
        this._listItems = [...items];
        this._cdr.detectChanges();
    }

    /** @hidden */
    onUserClick(user: ApprovalUser): void {
        this.setUserToShowDetails(user);
    }

    /** @hidden */
    backToListFromDetails(): void {
        this._userToShowDetails = undefined;
    }

    /** @hidden */
    setUserToShowDetails(user: ApprovalUser): void {
        this._userToShowDetails = user;
        this._userToShowDetailsData$ = this.data.approvalFlowDataSource.fetchUser(user.id);
    }

    /** @hidden */
    sendReminder(): void {
        const reminderTargets = this._isListMode ? this.getUsersFromSelectedItems() : this.data.node.approvers;
        this.dialogRef.close(reminderTargets);
    }

    /** @hidden */
    getUsersFromSelectedItems(): ApprovalUser[] {
        return this._selectedItems.map(item => {
            return this.data.node.approvers.find(user => `${this._listItemIdPrefix + user.id}` === item.itemEl.nativeElement.id);
        });
    }

    /** @hidden */
    onSearchStringChange(searchString: string): void {
        this._selectedItems = [];
        if (!searchString) {
            this.setListItems(this.data.node.approvers);
            return;
        }

        this.setListItems(this.data.node.approvers.filter(
            user => user.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1
        ));
    }

    /** @hidden */
    get data(): DialogRefData {
        return this.dialogRef.data;
    }
}

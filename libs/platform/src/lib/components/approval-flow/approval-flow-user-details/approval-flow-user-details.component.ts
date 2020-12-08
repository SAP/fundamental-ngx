import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

import { Observable } from 'rxjs';

import { ApprovalDataSource, ApprovalNode, User } from '../public_api';

@Component({
    selector: 'fdp-approval-flow-user-details',
    templateUrl: './approval-flow-user-details.component.html',
    styleUrls: ['./approval-flow-user-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalFlowUserDetailsComponent implements OnInit {
    @Input() node: ApprovalNode;

    @Input() approvalFlowDataSource: ApprovalDataSource;

    /** @hidden */
    _isListMode = false;

    /** @hidden */
    _listItems: User[] = [];

    /** @hidden */
    _selectedItems: any[] = [];

    /** @hidden */
    _userToShowDetails: User;

    /** @hidden */
    _userToShowDetailsData$: Observable<any>;

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef, private _cdr: ChangeDetectorRef) {
    }

    /** @hidden */
    ngOnInit(): void {
        this._isListMode = this.dialogRef.data.node?.approvers.length > 1;
        if (this._isListMode) {
            this.setListItems(this.dialogRef.data.node.approvers);
        } else {
            this.setUserToShowDetails(this.dialogRef.data.watcher || this.dialogRef.data.node?.approvers[0]);
        }
    }

    /** @hidden */
    setListItems(items: User[]): void {
        this._listItems = [...items];
        this._cdr.detectChanges();
    }

    /** @hidden */
    onUserClick(user: User): void {
        this.setUserToShowDetails(user);
    }

    /** @hidden */
    backToListFromDetails(): void {
        this._userToShowDetails = undefined;
    }

    /** @hidden */
    setUserToShowDetails(user: User): void {
        this._userToShowDetails = user;
        this._userToShowDetailsData$ = this.dialogRef.data.approvalFlowDataSource.fetchUser(user.id);
    }

    /** @hidden */
    sendReminder(): void {
        const reminderTargets = this._isListMode ? this.getUsersFromSelectedItems() : this.dialogRef.data.node.approvers;
        this.dialogRef.close(reminderTargets);
    }

    /** @hidden */
    getUsersFromSelectedItems(): User[] {
        return this._selectedItems.map(item => {
            return this.dialogRef.data.node.approvers.find(user => user.imgUrl === item.avatarSrc && user.name === item.title);
        });
    }

    /** @hidden */
    onSearchStringChange(searchString: string): void {
        this._selectedItems = [];
        if (!searchString) {
            this.setListItems(this.dialogRef.data.node.approvers);
            return;
        }

        this.setListItems(this.dialogRef.data.node.approvers.filter(
            user => user.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1
        ));
    }
}

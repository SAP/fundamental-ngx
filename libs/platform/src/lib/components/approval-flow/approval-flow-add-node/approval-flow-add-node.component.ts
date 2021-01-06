import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';

import { ApprovalDataSource, ApprovalNode, ApprovalUser } from '../public_api';
import { DialogRef, FdDate } from '@fundamental-ngx/core';
import { take } from 'rxjs/operators';
import { StandardListItemComponent } from '../../list/standard-list-item/standard-list-item.component';

interface AddNodeDialogRefData {
    node?: ApprovalNode;
    approvalFlowDataSource: ApprovalDataSource;
    userDetailsTemplate: TemplateRef<any>;
    rtl: boolean;
}

@Component({
    selector: 'fdp-approval-flow-add-node',
    templateUrl: './approval-flow-add-node.component.html',
    styleUrls: ['./approval-flow-add-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalFlowAddNodeComponent implements OnInit {
    _approverType = '';
    _dueDate = FdDate.getNow();
    _selectApproversMode = false;
    _userDetailsMode = false;
    _approvers: ApprovalUser[] = [];
    _selectedApprovers: any[] = [];

    /** @hidden */
    _listItemIdPrefix = 'approval-node-user-';

    constructor(public dialogRef: DialogRef, private _cdr: ChangeDetectorRef) {
    }

    /** @hidden */
    get _data(): AddNodeDialogRefData {
        return this.dialogRef.data;
    }

    ngOnInit(): void {
        this._data.approvalFlowDataSource.fetchApprovers()
            .pipe(take(1))
            .subscribe(approvers => this._approvers = approvers);
    }

    /** @hidden */
    _goToSelectApproversMode(): void {
        this._selectApproversMode = true;
        this._cdr.detectChanges();
    }

    /** @hidden */
    _exitSelectApproversMode(): void {
        this._selectApproversMode = false;
        this._cdr.detectChanges();
    }

    /** @hidden */
    _selectApprovers(): void {
        this._data.node.approvers = this._getUsersFromSelectedItems();
        this._exitSelectApproversMode();
    }

    /** @hidden */
    _getUsersFromSelectedItems(): ApprovalUser[] {
        return this._selectedApprovers.map(item =>
            this._approvers.find(user => `${this._listItemIdPrefix + user.id}` === item.itemEl.nativeElement.id)
        );
    }

    /** @hidden */
    _displayUserFn(item: StandardListItemComponent): string {
        return item.avatarTitle;
    }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';

import { ApprovalDataSource, ApprovalNode, ApprovalUser } from '../public_api';
import { DialogRef, FdDate } from '@fundamental-ngx/core';

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
export class ApprovalFlowAddNodeComponent {
    _approverType = '';
    _dueDate = FdDate.getNow();
    _selectApproversMode = false;
    _showUserDetailsMode = false;
    _selectedApprovers: any[] = [];

    constructor(public dialogRef: DialogRef, private _cdr: ChangeDetectorRef) {
    }

    /** @hidden */
    get _data(): AddNodeDialogRefData {
        return this.dialogRef.data;
    }

    /** @hidden */
    _goToSelectApproversMode(): void {
        this._selectApproversMode = true;
        this._cdr.detectChanges();
    }
}

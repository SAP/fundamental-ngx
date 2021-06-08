import { ChangeDetectionStrategy, Component } from '@angular/core';

import { APPROVAL_FLOW_NODE_TYPES } from '../approval-flow-add-node/approval-flow-add-node.component';
import { DialogRef } from '@fundamental-ngx/core';

export interface SelectTypeDialogRefData {
    rtl: boolean;
}


@Component({
    selector: 'fdp-approval-flow-select-type',
    templateUrl: './approval-flow-select-type.component.html',
    styleUrls: ['./approval-flow-select-type.component.scss', '../styles/approval-flow-dialog.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprovalFlowSelectTypeComponent {
    /** @hidden */
    _nodeType = APPROVAL_FLOW_NODE_TYPES.SERIAL;

    /** @hidden */
    _nodeTypes = APPROVAL_FLOW_NODE_TYPES;

    /** @hidden */
    constructor(public _dialogRef: DialogRef) {}

    /** @hidden */
    get _data(): SelectTypeDialogRefData {
        return this._dialogRef.data;
    }
}

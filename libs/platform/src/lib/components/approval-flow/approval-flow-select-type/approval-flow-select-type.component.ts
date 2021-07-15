import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { APPROVAL_FLOW_NODE_TYPES } from '../approval-flow-add-node/approval-flow-add-node.component';

export interface SelectTypeDialogRefData {
    rtl: boolean;
}

export interface SelectTypeDialogFormData {
    type: APPROVAL_FLOW_NODE_TYPES;
    toNextSerial: boolean;
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

    _toNextSerial = false;

    /** @hidden */
    constructor(public _dialogRef: DialogRef) {}

    /** @hidden */
    get _data(): SelectTypeDialogRefData {
        return this._dialogRef.data;
    }

    /** @hidden */
    _submit(): void {
        this._dialogRef.close({ type: this._nodeType, toNextSerial: this._toNextSerial } as SelectTypeDialogFormData);
    }

}

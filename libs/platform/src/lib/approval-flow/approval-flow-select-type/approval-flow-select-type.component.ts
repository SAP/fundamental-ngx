import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { APPROVAL_FLOW_NODE_TYPES } from '../approval-flow-add-node/approval-flow-add-node.component';

export interface SelectTypeDialogFormData {
    type: APPROVAL_FLOW_NODE_TYPES;
    toNextSerial: boolean;
}

/**
 * @deprecated
 * ApprovalFlowSelectType component is depricated since version 0.40.0
 */
@Component({
    selector: 'fdp-approval-flow-select-type',
    templateUrl: './approval-flow-select-type.component.html',
    styleUrls: ['../styles/approval-flow-dialog.scss', './approval-flow-select-type.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fdp-approval-flow-dialog fdp-approval-flow-select-type'
    }
})
export class ApprovalFlowSelectTypeComponent {
    /** @hidden */
    _nodeType = APPROVAL_FLOW_NODE_TYPES.SERIAL;

    /** @hidden */
    _nodeTypes = APPROVAL_FLOW_NODE_TYPES;

    /** @hidden */
    _toNextSerial = false;

    /** @hidden */
    constructor(public readonly _dialogRef: DialogRef) {}

    /** @hidden */
    _submit(): void {
        this._dialogRef.close({ type: this._nodeType, toNextSerial: this._toNextSerial } as SelectTypeDialogFormData);
    }
}

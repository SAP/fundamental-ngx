import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { DialogRef } from '@fundamental-ngx/core/dialog';

import { CdkScrollable } from '@angular/cdk/overlay';

import { FormsModule } from '@angular/forms';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import { FormGroupComponent, FormItemComponent } from '@fundamental-ngx/core/form';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { APPROVAL_FLOW_NODE_TYPES } from '../approval-flow-add-node/approval-flow-add-node.component';

export interface SelectTypeDialogFormData {
    type: APPROVAL_FLOW_NODE_TYPES;
    toNextSerial: boolean;
}

/**
 * @deprecated
 * ApprovalFlowSelectType component is deprecated since version 0.40.0
 */
@Component({
    selector: 'fdp-approval-flow-select-type',
    templateUrl: './approval-flow-select-type.component.html',
    styleUrls: ['../styles/approval-flow-dialog.scss', './approval-flow-select-type.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fdp-approval-flow-dialog fdp-approval-flow-select-type'
    },
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TemplateDirective,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        ContentDensityDirective,
        FormGroupComponent,
        FormItemComponent,
        RadioButtonComponent,
        FormsModule,
        CheckboxComponent,
        DialogFooterComponent,
        ButtonBarComponent,
        FdTranslatePipe
    ]
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

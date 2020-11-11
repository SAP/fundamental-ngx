import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';
import { ApprovalNode } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-approval-flow-user-details',
    templateUrl: './approval-flow-user-details.component.html',
    styleUrls: ['./approval-flow-user-details.component.scss']
})
export class ApprovalFlowUserDetailsComponent implements OnInit {
    @Input() node: ApprovalNode;

    @Output() onSendReminder = new EventEmitter<void>();

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
    }

    ngOnInit(): void {
        console.log('ApprovalFlowUserDetailsComponent init', this);
    }

    sendReminder(): void {
        this.onSendReminder.emit();
    }

}

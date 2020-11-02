import { Component, Input, OnInit } from '@angular/core';

import { ApprovalDataSource, ApprovalProcess, UserDataSource } from './interfaces';

@Component({
    selector: 'fdp-approval-flow',
    templateUrl: './approval-flow.component.html',
    styleUrls: ['./approval-flow.component.scss']
})
export class ApprovalFlowComponent implements OnInit {
    /** Title which is displayed in the header of the Approval Flow component. */
    @Input() title = 'Approval  process';

    /** Data source for the Approval Flow component. */
    @Input() dataSource: ApprovalDataSource;

    /** Data source used for selecting approvers, and getting user details. */
    @Input() approverDataSource: UserDataSource;

    /** Data source used for selecting watchers and getting user details. */
    @Input() watcherDataSource: UserDataSource;

    _approvalProcess: ApprovalProcess;

    constructor() {
    }

    ngOnInit(): void {
        console.log('dataSource', { source: this.dataSource });
        this.dataSource.fetch().subscribe(approvalProcess => {
            this._approvalProcess = approvalProcess;
            console.log('approvalProcess', approvalProcess);
        })
    }

}

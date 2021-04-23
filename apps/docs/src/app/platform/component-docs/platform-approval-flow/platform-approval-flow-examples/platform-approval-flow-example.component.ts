import { Component } from '@angular/core';

import { ApprovalNode, ApprovalStatus } from '@fundamental-ngx/platform';

import { ApprovalFlowExampleDataSource } from './approval-flow-example-data-source.class';

@Component({
    selector: 'fdp-approval-flow-example',
    template: `
        <fdp-approval-flow
            title="Basic Approval Flow Demo"
            [dataSource]="dataSource"
            [userDetailsTemplate]="userDetailsTemplate"
            [checkDueDate]="checkDueDate"
            [allowSendRemindersForStatuses]="sendReminderStatuses"
            [isEditAvailable]="editModeEnabled"
            (nodeClick)="nodeClick($event)"
        >
        </fdp-approval-flow>
        <ng-template #userDetailsTemplate let-data="data">
            <div style="margin-bottom: 4px;"><b>Contact info</b></div>

            <div>Mobile <br> <a href="javascript:void(0)">{{ data?.phone }}</a></div>
            <div>E-mail <br> <a href="javascript:void(0)">{{ data?.email }}</a></div>

            <div style="margin-top: 1rem;margin-bottom: 4px;"><b>Company</b></div>

            <div>Name <br> Company A</div>
            <div>Address <br> 481 West Street, Anytown OH, 83749, USA</div>
        </ng-template>

        <p>
            Selected example:
            <select [(ngModel)]="selectedExample" (ngModelChange)="dataSource.selectGraph(selectedExample)">
                <option *ngFor="let example of examples" [value]="example">{{ example | titlecase }}</option>
            </select>
        </p>
        <p>Enable "Edit mode": <input type="checkbox" [(ngModel)]="editModeEnabled"></p>
        <p>Show due date warnings: <input type="checkbox" [(ngModel)]="checkDueDate"></p>
        <p>Set all statuses to "Not Started": <input type="checkbox" [(ngModel)]="setNotStartedStatuses" (ngModelChange)="setNotStarted()"></p>
        <p style="display: flex;align-items: center;">Allow sending reminders to approvers with statuses: 
            <fd-multi-input 
                style="margin-left: .5rem;"
                [compact]="true"
                [dropdownValues]="allStatuses"
                [(ngModel)]="sendReminderStatuses"
            ></fd-multi-input>
        </p>
    `
})
export class PlatformApprovalFlowExampleComponent {
    dataSource = new ApprovalFlowExampleDataSource('complex');
    examples = ['simple', 'medium', 'complex'];
    selectedExample = 'complex';
    checkDueDate = false;
    setNotStartedStatuses = false;
    editModeEnabled = true;
    allStatuses = ['in progress', 'not started', 'approved', 'rejected'];
    sendReminderStatuses: ApprovalStatus[] = ['in progress', 'not started'];

    nodeClick(node: ApprovalNode): void {
        console.log('Node click handler', node);
    }

    setNotStarted(): void {
        this.dataSource.setDefaultStatus(this.setNotStartedStatuses ? 'not started' : null);
    }
}

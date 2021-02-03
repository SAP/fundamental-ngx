import { Component } from '@angular/core';

import { ApprovalNode } from '@fundamental-ngx/platform';

import { ApprovalFlowExampleDataSource } from './approval-flow-example-data-source.class';

@Component({
    selector: 'fdp-approval-flow-example',
    template: `
        <fdp-approval-flow
            title="Basic Approval Flow Demo"
            [dataSource]="dataSource"
            [userDetailsTemplate]="userDetailsTemplate"
            (nodeClick)="nodeClick($event)"
            [isEditAvailable]="true"
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
    `
})
export class PlatformApprovalFlowExampleComponent {
    dataSource = new ApprovalFlowExampleDataSource('simple');
    examples = ['simple', 'medium', 'complex'];
    selectedExample = 'simple';

    nodeClick(node: ApprovalNode): void {
        console.log('Node click handler', node);
    }
}

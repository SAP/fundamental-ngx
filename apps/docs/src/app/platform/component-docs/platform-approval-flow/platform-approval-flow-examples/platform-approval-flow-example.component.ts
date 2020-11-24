import { Component, TemplateRef, ViewChild } from '@angular/core';

import { ApprovalFlowExampleDataSource } from './approval-flow-example-data-source.class';

@Component({
    selector: 'fdp-approval-flow-example',
    template: `
        <fdp-approval-flow 
            title="Basic Approval Flow Demo"
            [dataSource]="dataSource" 
            [userDetailsTemplate]="userDetailsTemplate">
        </fdp-approval-flow>
        <ng-template #userDetailsTemplate let-data="data">
            <div style="margin-bottom: 4px;"><b>Contact info</b></div>
            
            <div>Mobile <br> <a href="javascript:void(0)">{{ data?.phone }}</a></div>
            <div>E-mail <br> <a href="javascript:void(0)">{{ data?.email }}</a></div>

            <div style="margin-top: 1rem;margin-bottom: 4px;"><b>Company</b></div>

            <div>Name <br> Company A</div>
            <div>Address <br> 481 West Street, Anytown OH, 83749, USA</div>
        </ng-template>
    `
})
export class PlatformApprovalFlowExampleComponent {
    @ViewChild('userDetailsTemplate') userDetailsTemplate: TemplateRef<any>;
    dataSource = new ApprovalFlowExampleDataSource();
}

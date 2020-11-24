import { Component, TemplateRef, ViewChild } from '@angular/core';

import { ApprovalFlowExampleDataSource } from './data-source.class';

@Component({
    selector: 'fdp-approval-flow-example',
    template: `
        <fdp-approval-flow 
            title="Basic Approval Flow Demo"
            [dataSource]="dataSource" 
            [userDetailsTemplate]="userDetailsTemplate">
        </fdp-approval-flow>
        <ng-template #userDetailsTemplate let-data="data">
            <b>user details template</b> <br> {{ data | json }}
            <p>Contact info</p>

            <div>Mobile <br> <a href="#">+001 123 4567 890</a></div>
            <div>Phone <br> <a href="#">+001 123 4567 890</a></div>
            <div>E-mail <br> <a href="#">sarah.smith@abccompany.com</a></div>

            <p>Company</p>

            <div>Name <br> Company A</div>
            <div>Address <br> 481 West Street, Anytown OH, 83749, USA</div>
        </ng-template>
    `
})
export class PlatformApprovalFlowExampleComponent {
    @ViewChild('userDetailsTemplate') userDetailsTemplate: TemplateRef<any>;
    dataSource = new ApprovalFlowExampleDataSource();
}

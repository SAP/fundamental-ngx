import { Component, Input, TemplateRef } from '@angular/core';
import { ApprovalUser } from '@fundamental-ngx/platform';
import { Observable } from 'rxjs';

@Component({
    selector: 'fdp-approval-flow-user-details',
    templateUrl: './approval-flow-user-details.component.html',
    styleUrls: ['./approval-flow-user-details.component.scss']
})
export class ApprovalFlowUserDetailsComponent {
    @Input() user: ApprovalUser;

    @Input() details: Observable<any>;

    @Input() detailsTemplate: TemplateRef<any> ;

}

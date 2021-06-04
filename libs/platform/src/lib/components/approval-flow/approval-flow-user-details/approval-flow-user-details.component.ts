import { Component, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { ApprovalUser } from '../interfaces';

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

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { Nullable } from '@fundamental-ngx/core/shared';
import { ApprovalUser } from '../interfaces';

@Component({
    selector: 'fdp-approval-flow-user-details',
    templateUrl: './approval-flow-user-details.component.html',
    styleUrls: ['./approval-flow-user-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fdp-approval-flow-user-details'
    }
})
export class ApprovalFlowUserDetailsComponent {
    /** Approval Flow user */
    @Input()
    user: ApprovalUser;

    /** Approval Flow user details */
    @Input()
    details: Nullable<Observable<any>>;

    /** Approval Flow user details template */
    @Input()
    detailsTemplate: TemplateRef<any>;
}

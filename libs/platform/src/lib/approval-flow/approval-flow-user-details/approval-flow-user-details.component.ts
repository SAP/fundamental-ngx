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
    @Input()
    user: ApprovalUser;

    @Input()
    details: Nullable<Observable<any>>;

    @Input()
    detailsTemplate: TemplateRef<any>;
}

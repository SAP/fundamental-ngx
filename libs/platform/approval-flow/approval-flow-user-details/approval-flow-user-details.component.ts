import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ApprovalUser } from '../interfaces';

/**
 * @deprecated
 * ApprovalFlowUserDetails component is deprecated since version 0.40.0
 */
@Component({
    selector: 'fdp-approval-flow-user-details',
    templateUrl: './approval-flow-user-details.component.html',
    styleUrl: './approval-flow-user-details.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fdp-approval-flow-user-details'
    },
    imports: [AvatarComponent, NgTemplateOutlet, AsyncPipe]
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

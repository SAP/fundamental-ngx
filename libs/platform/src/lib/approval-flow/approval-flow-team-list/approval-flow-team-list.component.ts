import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ApprovalTeam } from '../interfaces';
import { trackByFn } from '../helpers';

/**
 * @deprecated
 * ApprovalFlowTeamList component is deprecated since version 0.40.0
 */
@Component({
    selector: 'fdp-approval-flow-team-list',
    templateUrl: './approval-flow-team-list.component.html',
    styleUrls: ['./approval-flow-team-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fdp-approval-flow-team-list'
    }
})
export class ApprovalFlowTeamListComponent {
    /** Approval flow teams */
    @Input()
    teams: ApprovalTeam[] = [];

    /** Whether in RTL mode */
    @Input()
    isRtl = false;

    /** Selected team ID */
    @Input()
    selectedTeamId: Nullable<string>;

    /** Event emitted on team click */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onTeamClick = new EventEmitter<ApprovalTeam>();

    /** Event emitted on team selection change */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onTeamRadioClick = new EventEmitter<ApprovalTeam>();

    /** @hidden */
    _trackByFn = trackByFn;

    /** @hidden */
    _showTeamDetails(team: ApprovalTeam): void {
        this.onTeamClick.emit(team);
    }
}

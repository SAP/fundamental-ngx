import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ApprovalTeam } from '../interfaces';
import { trackByFn } from '../helpers';

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
    @Input()
    teams: ApprovalTeam[] = [];

    @Input()
    isRtl = false;

    @Input()
    selectedTeamId: number;

    @Output()
    onTeamClick = new EventEmitter<ApprovalTeam>();

    @Output()
    onTeamRadioClick = new EventEmitter<ApprovalTeam>();

    /** @hidden */
    _trackByFn = trackByFn;

    /** @hidden */
    _showTeamDetails(team: ApprovalTeam): void {
        this.onTeamClick.emit(team);
    }
}

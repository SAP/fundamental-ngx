import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ApprovalTeam } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-approval-flow-team-list',
    templateUrl: './approval-flow-team-list.component.html',
    styleUrls: ['./approval-flow-team-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ApprovalFlowTeamListComponent {
    @Input() teams: ApprovalTeam[] = [];

    @Output() onTeamClick = new EventEmitter<ApprovalTeam>();
    @Output() onTeamRadioClick = new EventEmitter<ApprovalTeam>();

    _selectedTeamId: number;

    showTeamDetails(team: ApprovalTeam): void {
        this.onTeamClick.emit(team);
    }
}

import { Injectable } from '@angular/core';
import { ApprovalTeam } from '@fundamental-ngx/platform';

export const SELECT_TEAM = 'SELECT_TEAM';
export const SELECT_USER = 'SELECT_USER';
export const VIEW_TEAM_MEMBERS = 'VIEW_TEAM_MEMBERS';
export const USER_DETAILS = 'USER_DETAILS';

type ViewModes = 'SELECT_TEAM' | 'SELECT_USER' | 'VIEW_TEAM_MEMBERS' | 'USER_DETAILS';

@Injectable()
export class ApprovalFlowAddNodeViewService {
    private currentView: ViewModes;
    private selectedTeam: ApprovalTeam;

    get isUserDetailsMode(): boolean {
        return this.currentView === USER_DETAILS;
    }

    get isSelectUserMode(): boolean {
        return this.currentView === SELECT_USER;
    }

    get isSelectTeamMode(): boolean {
        return this.currentView === SELECT_TEAM;
    }

    get isTeamMembersMode(): boolean {
        return this.currentView === VIEW_TEAM_MEMBERS;
    }

    get team(): ApprovalTeam {
        return this.selectedTeam;
    }

    setCurrentView(view: ViewModes): void {
        this.currentView = view;
    }

    resetView(): void {
        this.currentView = undefined;
    }

    selectTeam(team: ApprovalTeam): void {
        this.selectedTeam = team;
    }

    resetTeam(): void {
        this.selectedTeam = undefined;
    }
}

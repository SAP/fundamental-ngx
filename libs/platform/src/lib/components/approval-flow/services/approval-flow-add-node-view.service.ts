import { EventEmitter, Injectable } from '@angular/core';
import { ApprovalTeam } from '../interfaces';

export const SELECT_TEAM = 'SELECT_TEAM';
export const SELECT_USER = 'SELECT_USER';
export const VIEW_TEAM_MEMBERS = 'VIEW_TEAM_MEMBERS';
export const USER_DETAILS = 'USER_DETAILS';

type ViewModes = 'SELECT_TEAM' | 'SELECT_USER' | 'VIEW_TEAM_MEMBERS' | 'USER_DETAILS';

@Injectable()
export class ApprovalFlowAddNodeViewService {
    onViewChange = new EventEmitter();

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
        this.onViewChange.emit();
    }

    resetView(): void {
        this.currentView = undefined;
        this.onViewChange.emit();
    }

    selectTeam(team: ApprovalTeam): void {
        this.selectedTeam = team;
    }

    resetTeam(): void {
        this.selectedTeam = undefined;
    }
}

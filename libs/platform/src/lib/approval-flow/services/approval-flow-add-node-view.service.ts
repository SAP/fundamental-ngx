import { EventEmitter, Injectable } from '@angular/core';
import { ApprovalTeam } from '../interfaces';

export enum VIEW_MODES {
    SELECT_TEAM = 'SELECT_TEAM',
    SELECT_USER = 'SELECT_USER',
    VIEW_TEAM_MEMBERS = 'VIEW_TEAM_MEMBERS',
    USER_DETAILS = 'USER_DETAILS'
}

@Injectable()
export class ApprovalFlowAddNodeViewService {
    onViewChange = new EventEmitter();

    private currentView?: VIEW_MODES;
    private selectedTeam?: ApprovalTeam;

    get isUserDetailsMode(): boolean {
        return this.currentView === VIEW_MODES.USER_DETAILS;
    }

    get isTeamMembersMode(): boolean {
        return this.currentView === VIEW_MODES.VIEW_TEAM_MEMBERS;
    }

    get isSelectUserMode(): boolean {
        return this.currentView === VIEW_MODES.SELECT_USER;
    }

    get isSelectTeamMode(): boolean {
        return this.currentView === VIEW_MODES.SELECT_TEAM;
    }

    get team(): ApprovalTeam | undefined {
        return this.selectedTeam;
    }

    setCurrentView(view: VIEW_MODES): void {
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

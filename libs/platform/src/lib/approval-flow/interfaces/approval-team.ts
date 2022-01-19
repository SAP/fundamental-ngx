import { ApprovalUser } from './approval-user';

export interface ApprovalTeam {
    id: string;
    name: string;
    description: string;
    members: ApprovalUser[];
}

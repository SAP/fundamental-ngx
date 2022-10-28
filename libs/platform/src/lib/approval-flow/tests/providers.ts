import { cloneDeep } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApprovalTeam, ApprovalUser } from '../interfaces';
import { DataProvider, ProviderParams } from '@fundamental-ngx/platform/shared';
import { users, teams } from './data';

export class UserDataProvider extends DataProvider<ApprovalUser> {
    /** @hidden */
    fetch(params: ProviderParams): Observable<ApprovalUser[]> {
        let result = users;
        const query = params.get('query')?.toLowerCase();
        if (query) {
            result = result.filter((u) => u.name?.toLowerCase().startsWith(query));
        }
        return of(cloneDeep(result)).pipe(delay(500));
    }

    /** @hidden */
    getOne(params: ProviderParams): Observable<ApprovalUser & { phone: string; email: string }> {
        const id = params.get('id');
        const found = users.find((user) => user.id === id)!;
        return of({
            ...found,
            phone: Math.random().toFixed(13).toString().replace('0.', ''),
            email: `${found.name.toLowerCase().split(' ').join('.')}@company.com`
        });
    }
}

export class TeamDataProvider extends DataProvider<ApprovalTeam> {
    /** @hidden */
    fetch(params: ProviderParams): Observable<ApprovalTeam[]> {
        let result = teams;
        const query = params.get('query')?.toLowerCase();
        if (query) {
            result = result.filter((u) => u.name?.toLowerCase().startsWith(query));
        }
        return of(cloneDeep(result)).pipe(delay(500));
    }
}

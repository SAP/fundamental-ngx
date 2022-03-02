import { Observable } from 'rxjs';

export type DisabledBehavior = {
    fnDisabled: boolean;
} & Observable<boolean>;

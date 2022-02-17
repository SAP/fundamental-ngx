import { Observable } from 'rxjs';

export interface DisabledBehavior extends Observable<boolean> {
    fnDisabled: boolean;
}

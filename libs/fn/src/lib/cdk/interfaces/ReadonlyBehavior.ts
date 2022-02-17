import { Observable } from 'rxjs';

export interface ReadonlyBehavior extends Observable<boolean> {
    fnReadonly: boolean;
}

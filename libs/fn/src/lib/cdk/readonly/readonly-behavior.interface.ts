import { Observable } from 'rxjs';

export type ReadonlyBehavior = {
    fnReadonly: boolean;
} & Observable<boolean>;

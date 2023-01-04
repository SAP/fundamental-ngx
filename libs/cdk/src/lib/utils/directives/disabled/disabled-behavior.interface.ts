import { Observable } from 'rxjs';
import { DisabledViewModifier } from './disabled-view-modifier.interface';

type Base = Observable<boolean> & DisabledViewModifier;

export interface DisabledBehavior extends Base {
    fdDisabled: boolean;
}

import { Observable } from 'rxjs';
import { ReadonlyViewModifier } from './readonly-view-modifier.interface';

type Base = Observable<boolean> & ReadonlyViewModifier;

export interface ReadonlyBehavior extends Base {
    fnReadonly: boolean;
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { OptionStatusChange } from './select.component';

@Injectable()
export class SelectProxy {
    value$ = new BehaviorSubject<any>(undefined);
    optionStateChange$ = new Subject<OptionStatusChange>();
}

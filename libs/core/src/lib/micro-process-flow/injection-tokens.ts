import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export interface MicroProcessFlowComponentInterface {
    canItemsReceiveFocus: Subject<boolean>;
    setFocusedElementIndex(elm: HTMLElement): void;
}

export const MICRO_PROCESS_FLOW = new InjectionToken<MicroProcessFlowComponentInterface>(
    'Micro process flow component dependency'
);

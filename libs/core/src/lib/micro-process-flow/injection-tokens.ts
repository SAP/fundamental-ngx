import { InjectionToken } from '@angular/core';

export interface MicroProcessFlowComponentInterface {
    setFocusedElementIndex(elm: HTMLElement): void;
}

export const MICRO_PROCESS_FLOW = new InjectionToken<MicroProcessFlowComponentInterface>('Micro process flow component dependency');

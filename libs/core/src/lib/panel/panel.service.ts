import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PanelService {
    expanded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /** Whether the Panel is expanded */
    updateExpanded(value: boolean) {
        this.expanded$.next(value);
    }
}

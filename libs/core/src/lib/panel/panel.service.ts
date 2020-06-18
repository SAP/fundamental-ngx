import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ExpandedChange {
    isExpanded: boolean
    isExpandTriggerClick: boolean
}

@Injectable()
export class PanelService {
    expanded$ = new BehaviorSubject<ExpandedChange>({isExpanded: false, isExpandTriggerClick: false});

    /** Whether the Panel is expanded */
    updateExpanded(isExpanded: boolean, byUser: boolean) {
        this.expanded$.next({ isExpanded: isExpanded, isExpandTriggerClick: byUser });
    }
}

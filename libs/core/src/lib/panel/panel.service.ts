import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PanelService {
    /** Whether the Panel is expanded */
    expanded: BehaviorSubject<boolean>;

    constructor() {
        this.expanded = new BehaviorSubject(false);
    }

    updateExpanded(value: boolean) {
        this.expanded.next(value);
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PanelService {
    isExpanded: boolean = false;
    expanded$: BehaviorSubject<boolean> = new BehaviorSubject(this.isExpanded);

    /** Whether the Panel is expanded */
    updateExpanded(value: boolean) {
        value === this.isExpanded ? this.isExpanded = !value : this.isExpanded = value
        
        this.expanded$.next(this.isExpanded);
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DynamicPageService {
    collapsed = new BehaviorSubject<boolean>(false);
    pinned = new BehaviorSubject<boolean>(false);


    pixelsSizeChanged = new BehaviorSubject<number>(0)

    subheaderVisibilityChange = new Subject<void>();


    toggleCollapsed(): void {
        this.collapsed.next(!this.collapsed.value);
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DynamicPageService {
    /** @hidden */
    collapsed = new BehaviorSubject<boolean>(false);

    /** @hidden */
    pinned = new BehaviorSubject<boolean>(false);

    /** @hidden */
    pixelsSizeChanged = new BehaviorSubject<number>(0)

    /** @hidden */
    subheaderVisibilityChange = new Subject<void>();

    /** @hidden */
    toggleCollapsed(): void {
        this.collapsed.next(!this.collapsed.value);
    }
}

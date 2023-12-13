import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DynamicPageService {
    /** @ignore */
    collapsed = new BehaviorSubject<boolean>(false);

    /** @ignore */
    pinned = new BehaviorSubject<boolean>(false);

    /** @ignore */
    pixelsSizeChanged = new BehaviorSubject<number>(0);

    /** @ignore */
    subheaderVisibilityChange = new Subject<void>();

    /** @ignore */
    focusLayoutAction = new Subject<void>();

    /** @ignore */
    toggleCollapsed(): void {
        this.collapsed.next(!this.collapsed.value);
    }
}

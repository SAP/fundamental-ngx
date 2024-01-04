import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DynamicPageService {
    /** @hidden */
    collapsed = signal(false);

    /** @hidden */
    pinned = signal(false);

    /** @hidden */
    pixelsSizeChanged = signal(0);

    /** @hidden */
    subheaderVisibilityChange = new Subject<void>();

    /** @hidden */
    focusLayoutAction = new Subject<void>();

    /** @hidden */
    toggleCollapsed(): void {
        this.collapsed.update((collapsed) => !collapsed);
    }
}

import { ChangeDetectorRef, Component, Input } from '@angular/core';

import { VhdTab } from '../../models';

@Component({
    template: ''
})
export class VhdBaseTab {
    /** Tab Title */
    @Input()
    uid: string;

    /** Tab Title */
    @Input()
    tabTitle: string;

    /** Mobile view */
    @Input()
    mobile = false;

    /** @hidden */
    get type(): VhdTab {
        return VhdTab.defineConditions;
    }

    constructor(readonly _changeDetectorRef: ChangeDetectorRef) {}
}

import { ChangeDetectorRef, Component, Input } from '@angular/core';

import { VhdTab } from '../../models';

@Component({
    template: '',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
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

    /** @ignore */
    get type(): VhdTab {
        return VhdTab.defineConditions;
    }

    /** @ignore */
    constructor(readonly _changeDetectorRef: ChangeDetectorRef) {}
}

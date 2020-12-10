import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { ValueHelpDialogService } from '../value-help-dialog.service';

@Component({
    template: ''
})
export class ValueHelDialogBaseTab {
    /** Tab Title */
    @Input()
    tabTitle: string;

    /** Mobile view */
    @Input()
    mobile = false;

    /** @hidden  */
    protected _subscriptions: Subscription;

    get uid(): string {
        return this._stateService.uid;
    }

    constructor(
        readonly _stateService: ValueHelpDialogService<unknown>,
        readonly _changeDetectorRef: ChangeDetectorRef
    ) {}
}
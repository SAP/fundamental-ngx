import { Component, Inject, Input, OnDestroy, TemplateRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ACTION_SHEET_COMPONENT, ActionSheetInterface } from '../action-sheet.interface';

@Component({
  selector: 'fd-action-sheet-mobile',
  templateUrl: './action-sheet-mobile.component.html',
  styleUrls: ['./action-sheet-mobile.component.scss']
})
export class ActionSheetMobileComponent implements OnDestroy {

    @Input()
    open = false;

    /** @hidden
     * TODO
     * For internal usage
     */
    childContent: {
        actionSheetTemplate: TemplateRef<any>,
        title: string
    } = null;

    constructor(
        @Inject(ACTION_SHEET_COMPONENT) private _actionSheetComponent: ActionSheetInterface
    ) {}



    /** @hidden */
    private _listenOnActionSheetOpenChange(): void {
        this._actionSheetComponent.isOpenChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(isOpen => this._toggleDialog(isOpen));
    }
}

import { Component, Inject, TemplateRef } from '@angular/core';
import { ACTION_SHEET_COMPONENT, ActionSheetInterface } from '../action-sheet.interface';

@Component({
  selector: 'fd-action-sheet-mobile',
  templateUrl: './action-sheet-mobile.component.html',
  styleUrls: ['./action-sheet-mobile.component.scss']
})
export class ActionSheetMobileComponent {

    /** @hidden
     * TODO
     * For internal usage
     */
    childContent: {
        actionSheetTemplate: TemplateRef<any>
    } = null;

    constructor(
        @Inject(ACTION_SHEET_COMPONENT) private _actionSheetComponent: ActionSheetInterface
    ) {}

}

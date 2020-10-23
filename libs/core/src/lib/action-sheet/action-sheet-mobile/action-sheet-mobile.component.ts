import {
    Component,
    ElementRef,
    Inject,
    Input,
    Optional,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { ACTION_SHEET_COMPONENT, ActionSheetInterface } from '../action-sheet.interface';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeControl,
    MobileModeConfigToken
} from '../../utils/base-class/mobile-mode.class';

@Component({
    selector: 'fd-action-sheet-mobile',
    templateUrl: './action-sheet-mobile.component.html'
})
export class ActionSheetMobileComponent extends MobileModeBase<ActionSheetInterface> {

    /** Whenever links should be visible **/
    @Input()
    open = false;

    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    childContent: {
        actionSheetBodyTemplate: TemplateRef<any>,
    } = null;

    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(ACTION_SHEET_COMPONENT) actionSheetComponent: ActionSheetInterface,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, actionSheetComponent, MobileModeControl.ACTION_SHEET, mobileModes);
    }

    /** @hidden */
    close(event: Event): void {
        this.open = false;
    }


}

import {
    Component,
    Input,
    TemplateRef,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'fd-action-sheet-mobile',
    templateUrl: './action-sheet-mobile.component.html'
})
export class ActionSheetMobileComponent {

    /** Whenever links should be visible **/
    @Input()
    open = false;

    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    childContent: {
        actionSheetBodyTemplate: TemplateRef<any>,
    } = null;

    /** @hidden */
    close(event: Event): void {
        this.open = false;
    }
}

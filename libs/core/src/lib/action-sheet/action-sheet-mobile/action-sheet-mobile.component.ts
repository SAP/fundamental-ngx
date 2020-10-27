import {
    Component,
    Input,
    TemplateRef
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
    childContent: {
        actionSheetBodyTemplate: TemplateRef<any>,
    } = null;

    /** @hidden */
    close(event: Event): void {
        this.open = false;
    }
}

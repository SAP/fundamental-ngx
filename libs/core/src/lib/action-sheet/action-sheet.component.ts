import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component, ContentChild, ElementRef,
    EventEmitter,
    Input,
    Optional, Output,
    ViewEncapsulation
} from '@angular/core';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { ACTION_SHEET_COMPONENT, ActionSheetInterface } from './action-sheet.interface';
import {ActionSheetBodyComponent} from './action-sheet-body/action-sheet-body.component';


@Component({
    selector: 'fd-action-sheet',
    templateUrl: './action-sheet.component.html',
    styleUrls: ['./action-sheet.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetComponent implements AfterContentInit, ActionSheetInterface {

    constructor(
        private _elementRef: ElementRef,
        @Optional() private _dynamicComponentService: DynamicComponentService
    ) {}

    @ContentChild(ActionSheetBodyComponent) actionSheetBody;

    /** Whenever links wrapped inside overflow should be displayed in compact mode  */
    @Input()
    compact = false;

    /** Indicate if it's mobile mode **/
    @Input()
    mobile = false;

    /** Whenever links should be visible **/
    @Input()
    isOpen = false;

    /** To allow user to determine what event he wants to trigger the messages to show
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     **/
    @Input()
    triggers: string[] = ['click'];

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Method that changes state of mobile open variable */
     toggleOpen(): void {
        this.isOpen = !this.isOpen;
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.actionSheetBody.mobile = this.mobile;
        this.actionSheetBody.compact = this.compact;
        this.actionSheetBody.actionSheetItems.forEach(actionSheetItem => actionSheetItem.compact = this.compact);
        this.actionSheetBody.actionSheetItems.forEach(actionSheetItem => actionSheetItem.mobile = this.mobile);

    }
}

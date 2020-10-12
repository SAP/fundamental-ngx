import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component, ContentChildren, ElementRef,
    EventEmitter, Injector,
    Input,
    Optional, Output, QueryList, TemplateRef, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Placement } from 'popper.js';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { ActionSheetMobileComponent } from './action-sheet-mobile/action-sheet-mobile.component';
import { ACTION_SHEET_COMPONENT, ActionSheetInterface } from './action-sheet.interface';
import {ActionSheetItemComponent} from './action-sheet-item/action-sheet-item.component';


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

    @ContentChildren(ActionSheetItemComponent) actionSheetItems: QueryList<ActionSheetItemComponent>;

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

    /** @hidden */
    @ViewChild('actionSheetBody', { read: TemplateRef })
    actionSheetTemplate: TemplateRef<any>;

    /** @hidden */
    placement$ = new BehaviorSubject<Placement>('bottom-start');


    handleOpenChange(isOpen: boolean): void {
        this.isOpen = isOpen;
        this.isOpenChange.emit(isOpen);
    }

    /** Method that changes state of mobile open variable */
     toggleOpen(): void {
        this.isOpen = !this.isOpen;
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._setUpMobileMode();
        this.actionSheetItems.forEach(actionSheetItem => actionSheetItem.mobile = this.mobile);
        this.actionSheetItems.forEach(actionSheetItem => actionSheetItem.compact = this.compact);
    }

    /**
     * Function is called every time popover changes open attribute
     */
    openChanged(isOpen: boolean): void {
        this.isOpenChange.emit(isOpen);
    }



    /** @hidden */
    private _setUpMobileMode(): void {
        this._dynamicComponentService.createDynamicComponent(
            { actionSheetTemplate: this.actionSheetTemplate},
            ActionSheetMobileComponent,
            { container: this._elementRef.nativeElement },
            { injector: Injector.create({ providers: [{ provide: ACTION_SHEET_COMPONENT, useValue: this }] }) }

        );
    }

}

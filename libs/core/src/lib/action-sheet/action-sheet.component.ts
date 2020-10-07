import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component, ElementRef,
    EventEmitter, Injector,
    Input,
    Optional, Output, TemplateRef, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Placement } from 'popper.js';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { ActionSheetMobileComponent } from './action-sheet-mobile/action-sheet-mobile.component';
import { ACTION_SHEET_COMPONENT, ActionSheetInterface } from './action-sheet.interface';


@Component({
    selector: 'fd-action-sheet',
    templateUrl: './action-sheet.component.html',
    styleUrls: ['./action-sheet.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetComponent implements AfterContentInit, ActionSheetInterface {

    /** Whenever links wrapped inside overflow should be displayed in compact mode  */
    @Input()
    compact = false;

    /* TODO* */
    @Input()
    mobile = false;

    /* TODO */
    @Input()
    title: string = null;

    @Input()
    isOpen = false;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild('actionSheetBody', { read: TemplateRef })
    actionSheetTemplate: TemplateRef<any>;

    /** @hidden */
    placement$ = new BehaviorSubject<Placement>('bottom-start');

    constructor(
        private _elementRef: ElementRef,
        @Optional() private _dynamicComponentService: DynamicComponentService
    ) {}

    handleOpenChange(isOpen: boolean): void {
        this.isOpen = isOpen;
        this.isOpenChange.emit(isOpen);
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._setUpMobileMode();
    }


    /**
     * Function is called every time popover changes open attribute
     */
    public openChanged(isOpen: boolean): void {
        this.isOpenChange.emit(isOpen);
    }


    /** @hidden */
    private _setUpMobileMode(): void {
        this._dynamicComponentService.createDynamicComponent(
            { actionSheetTemplate: this.actionSheetTemplate, title: this.title },
            ActionSheetMobileComponent,
            { container: this._elementRef.nativeElement },
            { injector: Injector.create({ providers: [{ provide: ACTION_SHEET_COMPONENT, useValue: this }] }) }

        );
    }

}

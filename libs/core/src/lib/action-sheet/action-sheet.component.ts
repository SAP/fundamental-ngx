import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ViewChild,
    ElementRef,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    OnDestroy,
    Optional,
    Output,
    ViewEncapsulation, TemplateRef, ContentChildren
} from '@angular/core';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { ActionSheetBodyComponent } from './action-sheet-body/action-sheet-body.component';
import {
    FocusEscapeDirection,
    KeyboardSupportService
} from '../utils/services/keyboard-support/keyboard-support.service';
import { ActionSheetItemComponent } from './action-sheet-item/action-sheet-item.component';
import { startWith, takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
import {ActionSheetMobileComponent} from './action-sheet-mobile/action-sheet-mobile.component';
import {ACTION_SHEET_COMPONENT} from './action-sheet.interface';

@Component({
    selector: 'fd-action-sheet',
    templateUrl: './action-sheet.component.html',
    styleUrls: ['./action-sheet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        KeyboardSupportService
    ]
})
export class ActionSheetComponent implements AfterContentInit, AfterViewInit, OnDestroy {

    /** Whether should be displayed in compact mode **/
    @Input()
    compact = false;

    /** Whether should be displayed in mobile mode **/
    @Input()
    mobile = false;

    /** Whenever links should be visible **/
    @Input()
    open = false;

    /** Whether internal keyboard support should be enabled. It's enabled by default */
    @Input()
    keyboardSupport = true;

    /** To allow user to determine what event he wants to trigger the messages to show
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     **/
    @Input()
    triggers: string[] = ['click'];


    /** Event thrown, when focus escapes the list */
    @Output()
    focusEscapeList = new EventEmitter<FocusEscapeDirection>();

    /** Event emitted, when the combobox's popover body is opened or closed */
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ContentChild(ActionSheetBodyComponent) actionSheetBody;

    // @ContentChildren(ActionSheetItemComponent, { descendants: true }) actionSheetBody;

    /** @hidden */
    @ViewChild('actionSheetBodyTemplate')
    actionSheetBodyTemplate: TemplateRef<any>;

    // ContentChild action sheet control
    // click - isOpenChangeHandle tylko dla mobila

    /** @hidden **/
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _keyboardSupportService: KeyboardSupportService<ActionSheetItemComponent>,
        @Optional() private _dynamicComponentService: DynamicComponentService
    ) {}


    /** @hidden */
    ngAfterContentInit(): void {
        this.actionSheetBody.mobile = this.mobile;
        this.actionSheetBody.compact = this.compact;
        this.actionSheetBody.actionSheetItems.forEach(actionSheetItem => actionSheetItem.compact = this.compact);
        this.actionSheetBody.actionSheetItems.forEach(actionSheetItem => actionSheetItem.mobile = this.mobile);
        this._keyboardSupportService.setKeyboardService(this.actionSheetBody.actionSheetItems, false);
        this._listenOnItemsChange();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        if (this.open !== isOpen) {
            this.open = isOpen;
            this.openChange.emit(isOpen);
        }
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this.keyboardSupport) {
            this._keyboardSupportService.onKeyDown(event)
        }
    }

    /** Set fake focus on element with passed index */
    setItemActive(index: number): void {
        this._keyboardSupportService.keyManager.setActiveItem(index);
    }

    /** @hidden */
    private _listenOnItemsChange(): void {
        this.actionSheetBody.actionSheetItems.changes
            .pipe(
                startWith(0),
                takeUntil(this._onDestroy$)
            )
            .subscribe(() => this._listenOnItemsClick()
            );
    }

    private _listenOnItemsClick(): void {
        /** Finish all of the streams, from before */
        this._onRefresh$.next();
        /** Merge refresh/destroy observables */
        const refreshObs = merge(this._onRefresh$, this._onDestroy$);
        this.actionSheetBody.actionSheetItems.forEach(
            (item, index) => {
                item.clicked
                    .pipe(takeUntil(refreshObs))
                    .subscribe(event => this.setItemActive(index))
            }
        );
    }

    /** @hidden */
    private _setUpMobileMode(): void {
        this._dynamicComponentService.createDynamicComponent(
            { actionSheetBodyTemplate: this.actionSheetBodyTemplate },
            ActionSheetMobileComponent,
            { container: this._elementRef.nativeElement },
            { injector: Injector.create({ providers: [{ provide: ACTION_SHEET_COMPONENT, useValue: this }] }) }
        );
    }
}

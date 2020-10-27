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
    ViewEncapsulation,
    TemplateRef,
    ComponentRef,
    QueryList,
    ContentChildren
} from '@angular/core';
import { PopoverComponent } from '../popover/popover.component';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { ActionSheetBodyComponent } from './action-sheet-body/action-sheet-body.component';
import { ActionSheetControlComponent } from './action-sheet-control/action-sheet-control.component';
import {
    FocusEscapeDirection,
    KeyboardSupportService
} from '../utils/services/keyboard-support/keyboard-support.service';
import { ActionSheetItemComponent } from './action-sheet-item/action-sheet-item.component';
import { startWith, takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs';
import { ActionSheetMobileComponent } from './action-sheet-mobile/action-sheet-mobile.component';
import {ACTION_SHEET_COMPONENT, ActionSheetInterface} from './action-sheet.interface';

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
export class ActionSheetComponent implements AfterContentInit, AfterViewInit, OnDestroy, ActionSheetInterface {

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

    /** Event thrown, when the action sheet is opened or closed */
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ContentChild(ActionSheetBodyComponent)
    actionSheetBody: ActionSheetBodyComponent;

    /** @hidden */
    @ContentChild(ActionSheetControlComponent)
    actionSheetControl: ActionSheetControlComponent;

    /** @hidden */
    @ContentChildren(ActionSheetItemComponent, { descendants: true })
    actionSheetItems: QueryList<ActionSheetItemComponent>;

    /** @hidden */
    @ViewChild('actionSheetBodyTemplate')
    actionSheetBodyTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverComponent: PopoverComponent;

    /** @hidden */
    actionSheetMobileDynamic: ComponentRef<ActionSheetMobileComponent>;

    /** @hidden **/
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden **/
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _keyboardSupportService: KeyboardSupportService<ActionSheetItemComponent>,
        @Optional() private _dynamicComponentService: DynamicComponentService
    ) {}


    /** @hidden */
    ngAfterContentInit(): void {
        this._initializeChildrenState();
        this._keyboardSupportService.setKeyboardService(this.actionSheetItems, false);
        this._listenOnItemsChange();
        this._actionControlHandle();
        this._actionItemsHandle();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.mobile) {
            this._setUpMobileMode();
        }
        if (this.popoverComponent && this.popoverComponent) {
            this.popoverComponent.directiveRef.loaded.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
                setTimeout(() => {
                    this.setItemActive(0);
                });
            });
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    private _initializeChildrenState(): void {
        this.actionSheetBody.mobile = this.mobile;
        this.actionSheetBody.compact = this.compact;
        this.actionSheetItems.forEach(actionSheetItem => actionSheetItem.compact = this.compact);
    }

    /** @hidden */
    private _actionControlHandle(): void {
        this.actionSheetControl.clicked
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((isOpen) => this.isOpenChangeHandle(isOpen));
    }

    /** @hidden */
    private _actionItemsHandle(): void {
        this.actionSheetItems.forEach(item => item.clicked
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((isOpen) => this.isOpenChangeHandle(isOpen))
        );
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        this.open = isOpen;
        if (this.mobile) {
            this.actionSheetMobileDynamic.instance.open = this.open;
        } else {
            if (this.open) {
                this.popoverComponent.open()
            } else {
                this.popoverComponent.directiveRef.close()
            }
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
        this.actionSheetItems.changes
            .pipe(
                startWith(0),
                takeUntil(this._onDestroy$)
            )
            .subscribe(() => this._listenOnItemsClick());

    }

    private _listenOnItemsClick(): void {
        this._onRefresh$.next();
    }

    /** @hidden */
    private _setUpMobileMode(): void {
        this.actionSheetMobileDynamic = this._dynamicComponentService.createDynamicComponent(
            { actionSheetBodyTemplate: this.actionSheetBodyTemplate },
            ActionSheetMobileComponent,
            { container: this._elementRef.nativeElement },
            { injector: Injector.create({ providers: [{ provide: ACTION_SHEET_COMPONENT, useValue: this }] }) }
        );
    }
}

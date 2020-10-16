import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { ACTION_SHEET_COMPONENT, ActionSheetInterface } from './action-sheet.interface';
import {ActionSheetBodyComponent} from './action-sheet-body/action-sheet-body.component';
import {
    FocusEscapeDirection,
    KeyboardSupportService
} from '../utils/services/keyboard-support/keyboard-support.service';
import {ActionSheetItemComponent} from './action-sheet-item/action-sheet-item.component';
import {startWith, takeUntil} from 'rxjs/operators';
import {merge, Subject} from 'rxjs';

@Component({
    selector: 'fd-action-sheet',
    templateUrl: './action-sheet.component.html',
    styleUrls: ['./action-sheet.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        KeyboardSupportService
    ]
})
export class ActionSheetComponent implements AfterContentInit, ActionSheetInterface, OnDestroy {


    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _keyboardSupportService: KeyboardSupportService<ActionSheetItemComponent>,
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

    /** Whether internal keyboard support should be enabled. It's enabled by default */
    @Input()
    keyboardSupport = true;

    /** Event thrown, when focus escapes the list */
    @Output()
    focusEscapeList = new EventEmitter<FocusEscapeDirection>();


    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

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
        this._keyboardSupportService.setKeyboardService(this.actionSheetBody.actionSheetItems, false);
        this._listenOnQueryChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        console.log(event, 'keydow')
        if (this.keyboardSupport) {
            this._keyboardSupportService.onKeyDown(event)
        }
    }

    /** Set fake focus on element with passed index */
    setItemActive(index: number): void {
        console.log(index, 'setactive')
        this._keyboardSupportService.keyManager.setActiveItem(index);
    }

    /** @hidden */
    private _listenOnQueryChange(): void {
        console.log(this.actionSheetBody.actionSheetItems.changes)
        this.actionSheetBody.actionSheetItems.changes
            .pipe(
                startWith(0),
                takeUntil(this._onDestroy$)
            )
            .subscribe(() => {
                this._listenOnItemsClick();
            });
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
}

import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ViewChild,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Optional,
    Output,
    ViewEncapsulation,
    TemplateRef,
    ComponentRef,
    QueryList,
    ContentChildren,
    ChangeDetectorRef,
    ViewContainerRef
} from '@angular/core';
import { Subject, merge, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import {
    ContentDensityService,
    DynamicComponentService,
    FocusEscapeDirection,
    KeyboardSupportService
} from '@fundamental-ngx/core/utils';
import { Placement } from '@fundamental-ngx/core/shared';
import { PopoverComponent } from '@fundamental-ngx/core/popover';

import { ActionSheetMobileModule } from './action-sheet-mobile/action-sheet-mobile.module';
import { ActionSheetMobileComponent } from './action-sheet-mobile/action-sheet-mobile.component';
import { ActionSheetBodyComponent } from './action-sheet-body/action-sheet-body.component';
import { ActionSheetControlComponent } from './action-sheet-control/action-sheet-control.component';
import { ActionSheetItemComponent, ActionSheetClickEvent } from './action-sheet-item/action-sheet-item.component';

@Component({
    selector: 'fd-action-sheet',
    templateUrl: './action-sheet.component.html',
    styleUrls: ['./action-sheet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [KeyboardSupportService]
})
export class ActionSheetComponent implements AfterContentInit, AfterViewInit, OnDestroy {
    /** Whether should be displayed in compact mode **/
    @Input()
    set compact(compact: boolean) {
        this._compact = compact;
        this._initializeChildrenState();
        this._setItemsProperties();
    }

    get compact(): boolean {
        return this._compact;
    }

    /** Whether should be displayed in mobile mode **/
    @Input()
    mobile = false;

    /** The position of the popover body. Set to 'bottom' by default. **/
    @Input()
    placement: Placement = 'bottom';

    /** Whether the popover body has an arrow. Set to false by default. **/
    @Input()
    noArrow = false;

    /** Whenever links should be visible **/
    @Input()
    isOpen = false;

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
    readonly isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

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

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _compact: boolean;

    constructor(
        private readonly _keyboardSupportService: KeyboardSupportService<ActionSheetItemComponent>,
        private readonly _changeDetectionRef: ChangeDetectorRef,
        private readonly _viewContainerRef: ViewContainerRef,
        @Optional() private _contentDensityService: ContentDensityService,
        @Optional() private _dynamicComponentService: DynamicComponentService
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._initializeChildrenState();
        this._keyboardSupportService.setKeyboardService(this.actionSheetItems, false);
        this._listenOnItemsChange();
        this._actionControlHandle();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.mobile) {
            this._setUpMobileMode();
        }

        if (this._compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._contentDensityListener.subscribe((density) => {
                    this._compact = density !== 'cozy';
                    this.actionSheetBody.compact = density !== 'cozy';
                    this.actionSheetItems.forEach((item) => {
                        item.compact = density !== 'cozy';
                        this._changeDetectionRef.markForCheck();
                    });
                })
            );
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this.keyboardSupport) {
            this._keyboardSupportService.onKeyDown(event);
        }
    }

    /** Method that opens action sheet */
    open(): void {
        this.isOpenChangeHandle(true);
    }

    /** Method that closes action sheet */
    close(): void {
        this.isOpenChangeHandle(false);
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        this.isOpen = isOpen;

        if (this.mobile && this.actionSheetMobileDynamic) {
            this.actionSheetMobileDynamic.instance.toggleOpenState(this.isOpen);
        }

        this.isOpenChange.emit(isOpen);

        if (isOpen && !this.mobile) {
            this._setItemActive(0);
        }

        this._changeDetectionRef.detectChanges();
    }

    /** @hidden */
    private _initializeChildrenState(): void {
        if (this.actionSheetBody) {
            this.actionSheetBody.mobile = this.mobile;
            this.actionSheetBody.compact = this._compact;
        }
    }

    /** @hidden */
    private _actionControlHandle(): void {
        this.actionSheetControl.clicked.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.open());
    }

    /** @hidden */
    private _listenOnItemsChange(): void {
        this.actionSheetItems.changes.pipe(startWith(1), takeUntil(this._onDestroy$)).subscribe(() => {
            this._listenOnItemsClick();
            this._setItemsProperties();
        });
    }

    /** @hidden */
    private _listenOnItemsClick(): void {
        /** Finish all of the streams, from before */
        this._onRefresh$.next();
        /** Merge refresh/destroy observables */
        const refresh$ = merge(this._onRefresh$, this._onDestroy$);

        this.actionSheetItems.forEach((item, index) =>
            item.clicked.pipe(takeUntil(refresh$)).subscribe((event: ActionSheetClickEvent) => {
                this._setItemActive(index);
                if (event.shouldClose) {
                    this.close();
                }
            })
        );
    }

    /** @hidden Set fake focus on element with passed index */
    private _setItemActive(index: number): void {
        if (this._keyboardSupportService.keyManager) {
            this._keyboardSupportService.keyManager.setActiveItem(index);
        }
    }

    /** @hidden */
    private _setItemsProperties(): void {
        if (this.actionSheetItems) {
            this.actionSheetItems.forEach((actionSheetItem) => (actionSheetItem.compact = this._compact));
        }
    }

    /** @hidden */
    private async _setUpMobileMode(): Promise<void> {
        this.actionSheetMobileDynamic = await this._dynamicComponentService.createDynamicModule(
            { actionSheetBodyTemplate: this.actionSheetBodyTemplate },
            ActionSheetMobileModule,
            ActionSheetMobileComponent,
            this._viewContainerRef
        );
    }
}

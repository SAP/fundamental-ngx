import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ContentChild,
    ContentChildren,
    DestroyRef,
    EventEmitter,
    inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import {
    destroyObservable,
    DynamicComponentService,
    FocusEscapeDirection,
    KeyboardSupportService
} from '@fundamental-ngx/cdk/utils';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';

import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActionSheetBodyComponent } from './action-sheet-body/action-sheet-body.component';
import { ActionSheetControlComponent } from './action-sheet-control/action-sheet-control.component';
import { ActionSheetClickEvent, ActionSheetItemComponent } from './action-sheet-item/action-sheet-item.component';
import { ActionSheetMobileComponent } from './action-sheet-mobile/action-sheet-mobile.component';

@Component({
    selector: 'fd-action-sheet',
    templateUrl: './action-sheet.component.html',
    styleUrl: './action-sheet.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [KeyboardSupportService, DynamicComponentService],
    imports: [PopoverComponent, PopoverControlComponent, NgTemplateOutlet, PopoverBodyComponent]
})
export class ActionSheetComponent implements AfterContentInit, AfterViewInit, OnDestroy {
    /** Whether should be displayed in mobile mode */
    @Input()
    mobile = false;

    /** The position of the popover body. Set to 'bottom' by default. */
    @Input()
    placement: Placement = 'bottom';

    /** Whether the popover body has an arrow. Set to false by default. */
    @Input()
    noArrow = false;

    /** Whenever links should be visible */
    @Input()
    isOpen = false;

    /** Whether internal keyboard support should be enabled. It's enabled by default */
    @Input()
    keyboardSupport = true;

    /**
     * To allow user to determine what event he wants to trigger the messages to show
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
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

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _onRefresh$ = new Subject<void>();

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private readonly _keyboardSupportService: KeyboardSupportService<ActionSheetItemComponent>,
        private readonly _changeDetectionRef: ChangeDetectorRef,
        private readonly _viewContainerRef: ViewContainerRef,
        @Optional() private _dynamicComponentService: DynamicComponentService
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._initializeChildrenState();
        this._keyboardSupportService.setKeyboardService(this.actionSheetItems, true);
        this._listenOnItemsChange();
        this._actionControlHandle();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._onRefresh$.next();
        this._onRefresh$.complete();
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
        if (this.isOpen === isOpen) {
            return;
        }

        this.isOpen = isOpen;

        if (this.mobile && this.actionSheetMobileDynamic) {
            this.actionSheetMobileDynamic.instance.toggleOpenState(this.isOpen);
        }

        this.isOpenChange.emit(isOpen);

        isOpen ? this._setItemActive(0) : this.actionSheetControl._focus();

        this._changeDetectionRef.detectChanges();
    }

    /** @hidden */
    private _initializeChildrenState(): void {
        if (this.actionSheetBody) {
            this.actionSheetBody.mobile = this.mobile;
        }
    }

    /** @hidden */
    private _actionControlHandle(): void {
        this.actionSheetControl.clicked
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => (this.isOpen ? this.close() : this.open()));
    }

    /** @hidden */
    private _listenOnItemsChange(): void {
        this.actionSheetItems.changes.pipe(startWith(1), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._listenOnItemsClick();
        });
    }

    /** @hidden */
    private _listenOnItemsClick(): void {
        /** Finish all of the streams, from before */
        this._onRefresh$.next();
        /** Merge refresh/destroy observables */
        const refresh$ = merge(this._onRefresh$, destroyObservable(this._destroyRef));

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
        this._keyboardSupportService.keyManager?.setActiveItem(index);
    }

    /** @hidden */
    private async _setUpMobileMode(): Promise<void> {
        this.actionSheetMobileDynamic = this._dynamicComponentService.createDynamicComponent(
            {
                actionSheetBodyTemplate: this.actionSheetBodyTemplate,
                isOpenChangeHandle: this.isOpenChangeHandle.bind(this)
            },
            ActionSheetMobileComponent,
            {
                containerRef: this._viewContainerRef
            }
        );
    }
}

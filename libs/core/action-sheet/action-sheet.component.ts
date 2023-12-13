import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ContentChild,
    ContentChildren,
    EventEmitter,
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
import { Subject, Subscription, merge } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { DynamicComponentService, FocusEscapeDirection, KeyboardSupportService } from '@fundamental-ngx/cdk/utils';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';

import { NgTemplateOutlet } from '@angular/common';
import { PopoverBodyComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
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
    standalone: true,
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

    /** @ignore */
    @ContentChild(ActionSheetBodyComponent)
    actionSheetBody: ActionSheetBodyComponent;

    /** @ignore */
    @ContentChild(ActionSheetControlComponent)
    actionSheetControl: ActionSheetControlComponent;

    /** @ignore */
    @ContentChildren(ActionSheetItemComponent, { descendants: true })
    actionSheetItems: QueryList<ActionSheetItemComponent>;

    /** @ignore */
    @ViewChild('actionSheetBodyTemplate')
    actionSheetBodyTemplate: TemplateRef<any>;

    /** @ignore */
    @ViewChild(PopoverComponent)
    popoverComponent: PopoverComponent;

    /** @ignore */
    actionSheetMobileDynamic: ComponentRef<ActionSheetMobileComponent>;

    /** @ignore */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @ignore */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** @ignore */
    private _subscriptions = new Subscription();

    /** @ignore */
    constructor(
        private readonly _keyboardSupportService: KeyboardSupportService<ActionSheetItemComponent>,
        private readonly _changeDetectionRef: ChangeDetectorRef,
        private readonly _viewContainerRef: ViewContainerRef,
        @Optional() private _dynamicComponentService: DynamicComponentService
    ) {}

    /** @ignore */
    ngAfterContentInit(): void {
        this._initializeChildrenState();
        this._keyboardSupportService.setKeyboardService(this.actionSheetItems, true);
        this._listenOnItemsChange();
        this._actionControlHandle();
    }

    /** @ignore */
    ngAfterViewInit(): void {
        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Method that opens action sheet */
    open(): void {
        this.isOpenChangeHandle(true);
    }

    /** Method that closes action sheet */
    close(): void {
        this.isOpenChangeHandle(false);
    }

    /** @ignore */
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

    /** @ignore */
    private _initializeChildrenState(): void {
        if (this.actionSheetBody) {
            this.actionSheetBody.mobile = this.mobile;
        }
    }

    /** @ignore */
    private _actionControlHandle(): void {
        this.actionSheetControl.clicked
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => (this.isOpen ? this.close() : this.open()));
    }

    /** @ignore */
    private _listenOnItemsChange(): void {
        this.actionSheetItems.changes.pipe(startWith(1), takeUntil(this._onDestroy$)).subscribe(() => {
            this._listenOnItemsClick();
        });
    }

    /** @ignore */
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

    /** @ignore Set fake focus on element with passed index */
    private _setItemActive(index: number): void {
        this._keyboardSupportService.keyManager?.setActiveItem(index);
    }

    /** @ignore */
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

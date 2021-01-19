import {
    AfterContentInit,
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CdkConnectedOverlay, ViewportRuler } from '@angular/cdk/overlay';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';

import { PopperOptions } from 'popper.js';

import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { DialogConfig } from '../dialog/utils/dialog-config.class';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { SelectMobileComponent } from './select-mobile/select-mobile.component';
import { FD_OPTION_PARENT_COMPONENT, OptionComponent } from './option/option.component';
import { MatSelectCommonBehavior,
        MatSelectCommonBehaviorCtor,
        mixinMatSelectCommons,
        _MatSelectMixinCommons } from './commons/select-commons';
import { PopoverFillMode } from '../popover/popover-position/popover-position';

let selectUniqueId = 0;
export type SelectControlState = 'error' | 'success' | 'warning' | 'information';

/**
 * Event object that is emitted when selection is changed
 */
export class FdSelectChange {
    constructor(readonly source: SelectComponent, readonly value: any) {}
}
/**
 * A Popup like component rendering list of values for the single selection use-case. This component also features mobile
 * mode which enhances the component with the full screen mode for the Option item list.
 */
@Component({
    selector: 'fd-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fd-select-custom-class]': 'true',
        '[class.fd-select-custom-class--mobile]': 'mobile',
    },
    providers: [{ provide: FD_OPTION_PARENT_COMPONENT,
         useExisting: SelectComponent}]
})
export class SelectComponent extends _MatSelectMixinCommons
    implements
        OnInit,
        OnChanges,
        AfterContentInit,
        OnDestroy,
        AfterViewInit,
        ControlValueAccessor,
        MatSelectCommonBehavior {
    /**
     * Id of the control.
     */
    @Input()
    controlId = `fd-select-${selectUniqueId++}`;

    /** Whether the select component is disabled. */
    @Input()
    state: SelectControlState = null;

    @Input()
    mobile = false;

    /**
     * In case of error or warning msg appears as first item in the list of values
     */
    @Input()
    stateMessage: string;

    /**
     * Whether the select component is disabled.
     */
    @Input()
    disabled = false;

    /**
     * Whether the select component is readonly.
     */
    @Input()
    readonly = false;

    /**
     * Placeholder for the select. Appears in the triggerbox if no option is selected.
     */
    @Input()
    placeholder: string;

    /**
     * Whether the select is in compact mode.
     */
    @Input()
    compact = false;

    /** Whether option components contain more than basic text. */
    @Input()
    extendedBodyTemplate = false;

    /**
     * Max height of the popover. Any overflowing elements will be accessible through scrolling. *
     */
    @Input()
    maxHeight: string;

    /**
     * Glyph to add icon in the select component.
     */
    @Input()
    glyph = 'slim-arrow-down';

    /** Whether close the popover on outside click. */
    @Input()
    closeOnOutsideClick = true;

    /** Popper.js options of the popover. */
    @Input()
    popperOptions: PopperOptions = {
        placement: 'bottom-start',
        modifiers: {
            preventOverflow: {
                enabled: true,
                escapeWithReference: true,
                boundariesElement: 'scrollParent'
            }
        }
    };

    /**
     * Preset options for the Select body width, whatever is chosen, the body has a 600px limit.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control. - Default
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * 'fit-content' will apply width needed to properly display items inside, independent of control.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /** The element to which the popover should be appended. */
    @Input()
    appendTo: ElementRef;

    /** makes undefined value also be selected */
    @Input()
    unselectMissingOption = true;

    /** Time to wait in milliseconds after the last keydown before focusing or selecting option based on alphanumeric keys. */
    @Input()
    typeaheadDebounceInterval = 250;

    /**
     * Binds to control aria-labelledBy attribute
     */
    @Input()
    ariaLabelledBy: string = null;

    /**
     * Sets control aria-label attribute value
     */
    @Input()
    ariaLabel: string = null;

    /** Select Input Mobile Configuration */
    @Input()
    mobileConfig: MobileModeConfig = { hasCloseButton: true };

    /** Custom template used to build control body. */
    @Input()
    controlTemplate: TemplateRef<any>;

    /**
     * Sets value of the selected option.
     */
    @Input()
    get value(): any {
        return this._internalValue;
    }

    set value(newValue: any) {
        if (newValue !== this._internalValue) {
            this.writeValue(newValue);
            this._internalValue = newValue;
        }
    }

    /**
     * Function to compare the option values with the selected values.
     * @see MatSelectCommonBehavior
     */
    @Input()
    get compareWith(): (o1: any, o2: any) => boolean {
        return this._compareWith;
    }

    set compareWith(fn: (o1: any, o2: any) => boolean) {
        if (typeof fn !== 'function') {
            throw Error('compareWith` must be a function.');
        }
        this._compareWith = fn;
        if (this._selectionModel) {
            // A different comparator means the selection could change.
            this._initializeSelection();
        }
    }

    /**
     * Event emitted when the popover open state changes
     */
    @Output()
    readonly isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Event emitted when the selected value of the select changes.
     */
    @Output()
    readonly valueChange: EventEmitter<FdSelectChange> = new EventEmitter<FdSelectChange>();

    /**
     * Queries all the define FdOptions
     * @hidden
     */
    @ContentChildren(OptionComponent, { descendants: true })
    _options: QueryList<OptionComponent>;

    /**@hidden
     * Triggering element that opens up the overlay with list of options
     */
    @ViewChild('selectControl')
    _controlElementRef: ElementRef;

    /**@hidden
     * Reference to element containing list of options */
    @ViewChild('selectOptionsListTemplate')
    _selectOptionsListTemplate: TemplateRef<any>;

    /** @hidden
     * Reference to root element for the mobile mode dialog */
    @ViewChild('dialogContainer')
    _dialogContainerElementRef: ElementRef;

    /**
     * Overlay pane containing the options.
     * @hidden
     */
    @ViewChild(CdkConnectedOverlay)
    _overlayDir: CdkConnectedOverlay;

    /**@hidden
     * Referent to the option;s container
     */
    @ViewChild('optionPanel', { read: ElementRef })
    _optionPanel: ElementRef;

    /** @hidden */
    _tabIndex: number;

    /**
     * Retrieves selected value if any.
     */
    get triggerValue(): string {
        const emptyValue = ' ';
        if (this.empty) {
            return this.placeholder || emptyValue;
        }
        return this.selected.viewValue || this.placeholder || emptyValue;
    }

    /**
     * Tells the OptionList if it's closable by simply selecting the item either with CLICK | SPACE | ENTER.
     * When we are in mobile mode (mobile=true) and have we have enabled confirmation buttons then we
     * dont close option list. We close only after we hit confirm button.
     */
    get canClose(): boolean {
        return !(this.mobile && this.mobileConfig.approveButtonText);
    }

    /**
     * Check if we can emit a value. They are 3 different paths where we can emit value:
     *  - We are not in mobile mode [mobile]=false
     *  - We are in mobile mode [mobile]=true and mobile dialog as just close X button to dismiss it
     *  - We are in mobile mode [mobile]=true and mobile dialog has ApproveButton available and
     *  dialog is closed. (meaning we already clicked this button)
     */
    get canEmitValueChange(): boolean {
        return (
            !this.mobile ||
            (this.mobile &&
                // Approve + Cancel
                !!this.mobileConfig.approveButtonText &&
                !this.panelOpen) ||
            // CloseButton. Emits when you click on the option item
            (this.mobileConfig.hasCloseButton && !!this.mobileConfig.approveButtonText === false)
        );
    }

    /** @hidden */
    _compareWith = (o1: any, o2: any) => o1 === o2;

    /** @hidden
     * from controlvalue accessor
    */
    onChange: Function = (value: any) => {};

     /** @hidden
     * from controlvalue accessor
    */
    onTouched: Function = () => {};

    constructor(
        public viewportRuler: ViewportRuler,
        public elementRef: ElementRef,
        public ngZone: NgZone,
        public changeDetectorRef: ChangeDetectorRef,
        @Optional() public dir: Directionality,
        @Attribute('tabindex') _tabIndex: string,
        @Self() @Optional() public ngControl: NgControl,
        public liveAnnouncer: LiveAnnouncer,
        @Optional() public dialogConfig: DialogConfig,
        @Optional() private _dynamicComponentService: DynamicComponentService,
        @Optional() private _injector: Injector
    ) {
        super(viewportRuler, elementRef, ngZone, changeDetectorRef, dir, ngControl, liveAnnouncer);

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

        this._tabIndex = parseInt(_tabIndex, 10) || 0;
    }

    /** @hidden */
    ngOnInit(): void {
        this.ariaLabel = this.ariaLabel || this.placeholder;
        this.ariaLabelledBy = this.ariaLabelledBy || this.placeholder;

        this._initializeCommonBehavior();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._registerEventsAfterContentInit();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setupMobileMode();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['typeaheadDebounceInterval'] && this._keyManager) {
            this._keyManager.withTypeAhead(this.typeaheadDebounceInterval);
        } else if (changes['disabled']) {
            this._tabIndex = this.disabled ? -1 : 0;
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._cleanupCommonBehavior();
    }

    /** @hidden
     * from ControlValue Accessor
     */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /** @hidden
     *   from ControlValue Accessor
    */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden
     *  from ControlValue Accessor
    */
   writeValue(value: any): void {
     if (this._options) {
        this._setSelectionByValue(value);
     }
    }

    /** @hidden */
    _popoverOpenChangeHandle(isOpen: boolean): void {
      isOpen ? this.open() : this.close();
    }

    /** @hidden */
    _setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();

        this._tabIndex = -1;
    }

    /** @hidden */
    @HostListener('window:resize')
    _resizeScrollHandler(): void {
        this._updateCalculatedHeight();
    }

    /**
     *
     * When mobile is TRUE, it patches current view container with Dialog and option panel does not trigger CDK
     * overlay but the list shows inside the dialog.
     *
     * @hidden
     * @see SelectMobileComponent
     */
    private _setupMobileMode(): void {
        if (this.mobile) {
            this._dynamicComponentService.createDynamicComponent(
                this._selectOptionsListTemplate,
                SelectMobileComponent,
                { container: this.elementRef.nativeElement },
                { injector: Injector.create({providers: [{provide: FD_OPTION_PARENT_COMPONENT, useValue: this}]})}
            );
        }
    }
}

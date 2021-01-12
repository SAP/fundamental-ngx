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
import { FD_OPTION_PARENT_COMPONENT, OptionComponent } from './option/option.component';
import { CdkConnectedOverlay, ViewportRuler } from '@angular/cdk/overlay';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { MatSelectCommonBehavior, MatSelectCommonBehaviorCtor, mixinMatSelectCommons } from './commons/select-commons';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { SelectMobileComponent } from './select-mobile/select-mobile.component';
import { DialogConfig } from '../dialog/utils/dialog-config.class';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { Subscription } from 'rxjs';

let selectUniqueId = 0;
export type SelectControlState = 'error' | 'success' | 'warning' | 'information';

/**
 *
 * Base class for applying Material Select Common behaviors
 *
 * @hidden
 */
export class MatSelectCommons {
    constructor(
        public viewportRuler: ViewportRuler,
        public elementRef: ElementRef,
        public ngZone: NgZone,
        public changeDetectorRef: ChangeDetectorRef,
        public dir: Directionality,
        public ngControl: NgControl,
        public liveAnnouncer: LiveAnnouncer
    ) {}
}

const _MatSelectMixinCommons: MatSelectCommonBehaviorCtor & typeof MatSelectCommons = mixinMatSelectCommons(
    MatSelectCommons
);

/**
 * Event object that is emitted when selection is changed
 */
export class FdSelectChange {
    constructor(readonly source: SelectComponent, readonly value: any) {}
}

/**
 * A Popup like component rendering list of values for the single selection use-case. This component also features mobile
 * mode which enhances the component with the full screen mode for the Option item list.
 *
 * Note: This is one of the several components that is powered material CDK.
 *
 * @CreditTo: Angular Component library for getting common functionality that was extracted out to mixins and
 * applied over this class.
 *
 * Just like it is described in the select-commons.ts they are going to be several phases:
 *  1) Try to reused as much as we can from established library and attach it to this select using mixins
 *  2) Break down newly created mixins into small pieces so they can be reused also outside of this select.
 *      e.g: HasKeyboardSupport, HasCDKOverlay, UseMatSelectFeatures,....
 *
 *
 *
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

    /**
     * Whether the select component is disabled.
     */
    @Input()
    disabled = false;

    /** Whether the select component is disabled. */
    @Input()
    state: SelectControlState = null;

    /**
     * Whether the select component is readonly.
     */
    @Input()
    readonly = false;

    /**
     * In case of error or warning msg appears as first item in the list of values
     */
    @Input()
    stateMessage: string;

    /**
     * Placeholder for the select. Appears in the triggerbox if no option is selected.
     */
    @Input()
    placeholder: string;

    /**
     * Sets value of the selected option.
     */
    @Input()
    get value(): any {
        return this.internalValue;
    }

    set value(newValue: any) {
        if (newValue !== this.internalValue) {
            this.writeValue(newValue);
            this.internalValue = newValue;
        }
    }

    /**
     * Whether the select is in compact mode.
     */
    @Input()
    compact = false;

    /**
     * Glyph to add icon in the select component.
     */
    @Input()
    glyph = 'slim-arrow-down';

    /**
     * If the option should be unselected and value changed to undefined, when the current value is
     * not presented in option array. Switching it off can be handy, when there is some delay between providing
     * possible options and chosen value.
     */

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

    /**
     * Max height of the popover. Any overflowing elements will be accessible through scrolling. *
     */
    @Input()
    maxHeight: string;

    /**
     * Time to wait in milliseconds after the last keydown before focusing or 
     * selecting option based on alphanumeric
     * keys.
     */
    @Input()
    typeaheadDebounceInterval = 250;

    /** Select Input Mobile Configuration */
    @Input()
    mobileConfig: MobileModeConfig = { hasCloseButton: true };

    /** Custom template used to build control body. */
    @Input()
    controlTemplate: TemplateRef<any>;

    @Input()
    mobile = false;

    @Input()
    closeOnOutsideClick = true;

    /**
     * Function to compare the option values with the selected values.
     *
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
        if (this.selectionModel) {
            // A different comparator means the selection could change.
            this.initializeSelection();
        }
    }

    /**
     * Event emitted when the popover open state changes
     */
    @Output()
    readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Event emitted when the selected value of the select changes.
     */
    @Output()
    readonly valueChange: EventEmitter<FdSelectChange> = new EventEmitter<FdSelectChange>();

    /**
     * Queries all the define FdOptions
     *
     * @hidden
     */
    @ContentChildren(OptionComponent, { descendants: true })
    options: QueryList<OptionComponent>;

    /**
     * Triggering element that opens up the overlay with list of options
     */
    @ViewChild('selectControl')
    controlElementRef: ElementRef;

    /** Reference to root element for the mobile mode dialog */
    @ViewChild('dialogContainer')
    dialogContainerElementRef: ElementRef;

    /** Reference to element containing list of options */
    @ViewChild('selectOptionsListTemplate')
    selectOptionsListTemplate: TemplateRef<any>;

    /**
     * Overlay pane containing the options.
     *
     * @hidden
     */
    @ViewChild(CdkConnectedOverlay)
    overlayDir: CdkConnectedOverlay;

    /**
     * Referent to the option;s container
     */
    @ViewChild('optionPanel', { read: ElementRef })
    optionPanel: ElementRef;

    /** @hidden */
    tabIndex: number;

   /** @hidden */
   /** Whether the widget has in RTL|LTR mode. */
   public _direction: string;
    
   /** @hidden */
   /** Subscription to the Directionality change EventEmitter. */
   private _dirChangeSubscription = Subscription.EMPTY; 

    /** @hidden */
    /** Whether the widget is in RTL mode or not. */
    private isRtl: boolean;

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
    private _compareWith = (o1: any, o2: any) => o1 === o2;

    /** @hidden */
    onChange: Function = (value: any) => {};

    /** @hidden */
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

        this.tabIndex = parseInt(_tabIndex, 10) || 0;


        this.isRtl = dir.value === 'rtl';
        this._dirChangeSubscription = dir.change.subscribe(() => {
            this._direction = this.isRtl ? 'rtl' : 'ltr';
            this.changeDetectorRef.detectChanges();
        });
    }

    /** @hidden */
    ngOnInit(): void {
        this.ariaLabel = this.ariaLabel || this.placeholder;
        this.ariaLabelledBy = this.ariaLabelledBy || this.placeholder;

        this.initializeCommonBehavior();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.registerEventsAfterContentInit();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setupMobileMode();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['typeaheadDebounceInterval'] && this.keyManager) {
            this.keyManager.withTypeAhead(this.typeaheadDebounceInterval);
        } else if (changes['disabled']) {
            this.tabIndex = this.disabled ? -1 : 0;
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.cleanupCommonBehavior();
        this._dirChangeSubscription.unsubscribe();
    }

    /** @hidden */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();

        this.tabIndex = -1;
    }

    /** @hidden */
    writeValue(value: any): void {
        if (this.options) {
            this.setSelectionByValue(value);
        }
    }

    /** @hidden */
    @HostListener('window:resize')
    resizeScrollHandler(): void {
        this.updateCalculatedHeight();
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
                this.selectOptionsListTemplate,
                SelectMobileComponent,
                { container: this.elementRef.nativeElement },
                { injector: Injector.create({providers: [{provide: FD_OPTION_PARENT_COMPONENT, useValue: this}]})}
            );
        }
    }
}

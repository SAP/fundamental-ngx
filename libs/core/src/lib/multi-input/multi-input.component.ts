import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PopoverComponent } from '../popover/popover.component';
import { PopoverFillMode } from '../popover/popover-directive/popover.directive';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import focusTrap, { FocusTrap } from 'focus-trap';
import { FormStates } from '../form/form-control/form-states';
import { ListItemDirective } from '../list/list-item.directive';
import { applyCssClass, CssClassBuilder, DynamicComponentService, KeyUtil } from '../utils/public_api';
import { MultiInputMobileComponent } from './multi-input-mobile/multi-input-mobile.component';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { DialogConfig, DIALOG_CONFIG } from '../dialog/dialog-utils/dialog-config.class';
import { MULTI_INPUT_COMPONENT, MultiInputInterface } from './multi-input.interface';
import { CheckboxComponent } from '../checkbox/checkbox/checkbox.component';
import { Subscription } from 'rxjs';
import { TokenizerComponent } from '../token/tokenizer.component';

/**
 * Input field with multiple selection enabled. Should be used when a user can select between a
 * limited number of pre-defined options with a filter-enabled context.
 *
 * Supports Angular Forms.
 */
@Component({
    selector: 'fd-multi-input',
    templateUrl: './multi-input.component.html',
    styleUrls: ['./multi-input.component.scss'],
    host: {
        '(blur)': 'onTouched()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiInputComponent),
            multi: true
        },
        MenuKeyboardService
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiInputComponent implements
    OnInit,
    ControlValueAccessor,
    OnChanges,
    AfterViewInit,
    CssClassBuilder,
    MultiInputInterface,
    OnDestroy {

    /** Placeholder for the input field. */
    @Input()
    placeholder: string = '';

    /** Whether the input is disabled. */
    @Input()
    disabled: boolean = false;

    /** Whether the input is in compact mode. */
    @Input()
    compact: boolean = false;

    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    @Input()
    maxHeight: string = '300px';

    /** Icon of the button on the right of the input field. */
    @Input()
    glyph: string = 'value-help';

    /** Values to be displayed in the unfiltered dropdown. */
    @Input()
    dropdownValues: any[] = [];

    /** Search term, or more specifically the value of the inner input field. */
    @Input()
    searchTerm: string;

    /** Whether the search term should be highlighted in results. */
    @Input()
    highlight: boolean = true;

    /** Selected dropdown items. */
    @Input()
    selected: any[] = [];

    /** user's custom classes */
    @Input()
    class: string;

    /** Filter function. Accepts an array and a string as arguments, and outputs an array.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details. */
    @Input()
    filterFn: Function = this.defaultFilter;

    /** Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details. */
    @Input()
    displayFn: Function = this.defaultDisplay;

    /** Parse function. Used for submitting new tokens. Accepts a string by default.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details. */
    @Input()
    newTokenParseFn: Function = this.defaultParse;

    /** Aria label for the multi input body. */
    @Input()
    multiInputBodyLabel: string = 'Multi input body';

    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /** Whether AddOn Button should be focusable, set to false by default */
    @Input()
    buttonFocusable: boolean = false;

    /** Whether the multi-input allows the creation of new tokens. */
    @Input()
    allowNewTokens: boolean = false;

    /** Whether the multi-input should be built on mobile mode */
    @Input()
    mobile: boolean = false;

    /** Whether the multi-input should have show all button. */
    @Input()
    showAllButton: boolean = true;

    /** Multi Input Mobile Configuration, it's applied only, when mobile is enabled */
    @Input()
    multiInputMobileConfig: MobileModeConfig;

    /** Event emitted when the search term changes. Use *$event* to access the new term. */
    @Output()
    readonly searchTermChange: EventEmitter<string> = new EventEmitter<string>();

    /** Event emitted when the selected items change. Use *$event* to access the new selected array. */
    @Output()
    readonly selectedChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    /** Whether multi input popover body should be opened */
    @Input()
    open: boolean = false;

    /** Event emitted, when the multi input's popover body is opened or closed */
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverRef: PopoverComponent;

    /** @hidden */
    @ViewChildren(CheckboxComponent)
    checkboxComponents: QueryList<CheckboxComponent>;

    /** @hidden */
    @ViewChild('control', { read: TemplateRef })
    controlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('list', { read: TemplateRef })
    listTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChildren(ListItemDirective)
    listItems: QueryList<ListItemDirective>;

    /** @hidden */
    @ViewChild('searchInputElement')
    searchInputElement: ElementRef;

    /** @hidden */
    @ViewChild(TokenizerComponent)
    tokenizer;

    /** @hidden */
    displayedValues: any[] = [];

    /** @hidden */
    focusTrap: FocusTrap;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    onChange: Function = () => {
    };

    /** @hidden */
    onTouched: Function = () => {
    };

    /** @hidden */
    constructor(
        @Optional() @Inject(DIALOG_CONFIG) public dialogConfig: DialogConfig,
        private _elementRef: ElementRef,
        private _changeDetRef: ChangeDetectorRef,
        private _menuKeyboardService: MenuKeyboardService,
        private _dynamicComponentService: DynamicComponentService
    ) {}

    /** @hidden */
    ngOnInit() {
        this.buildComponentCssClass();
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
        this.setupFocusTrap();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges) {
        this.buildComponentCssClass();
        if (this.shouldFilterValues(changes)) {
            this.displayedValues = this.dropdownValues;
            if (this.searchTerm) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
            }
            this._changeDetRef.markForCheck();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._menuKeyboardService.focusEscapeBeforeList = () => this.searchInputElement.nativeElement.focus();
        this._menuKeyboardService.focusEscapeAfterList = () => {
        };
        if (this.mobile) {
            this._setUpMobileMode();
        }
        this.setUpCheckboxSubscription();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            'fd-multi-input',
            'fd-multi-input-custom',
            this.class
        ]
            .filter((x) => x !== '')
            .join(' ');
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
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
        if (isDisabled) {
            this._elementRef.nativeElement.style.pointerEvents = 'none';
        } else {
            this._elementRef.nativeElement.style.pointerEvents = 'auto';
        }
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    writeValue(selected: any[]): void {
        if (selected) {
            this.selected = selected;
        }
        this._changeDetRef.markForCheck();
    }

    /** @hidden */
    openChangeHandle(open: boolean): void {
        if (this.open !== open) {
            this.openChange.emit(open);
        }

        this.open = open;
        if (!this.mobile) {
            this._popoverOpenHandle(open);
        }
        this._changeDetRef.detectChanges();
    }

    /** Method that selects all possible options. */
    selectAllItems(): void {
        this.selected = [...this.dropdownValues];

        // On Mobile mode changes are propagated only on approve.
        this._propagateChange();
    }

    /** @hidden */
    handleSelect(checked: any, value: any, event?: MouseEvent): void {
        if (event) {
            event.preventDefault(); // prevent this function from being called twice when checkbox updates
        }
        const previousLength = this.selected.length;
        if (checked) {
            this.selected.push(value);
        } else {
            this.selected.splice(this.selected.indexOf(value), 1);
        }

        // Handle popover placement update
        if (this._shouldPopoverBeUpdated(previousLength, this.selected.length)) {
            this.popoverRef.updatePopover();
        }

        // On Mobile mode changes are propagated only on approve.
        this._propagateChange();
    }

    /** @hidden */
    removeSelectedTokens(event: KeyboardEvent): void {
        let allSelected = true;
        if (KeyUtil.isKey(event, ['Delete', 'Backspace']) && !this.searchTerm) {
            this.tokenizer.tokenList.forEach(token => {
                if (token.selected) {
                    this.handleSelect(false, token.elementRef.nativeElement.innerText);
                } else {
                    allSelected = false;
                }
            });
            this.tokenizer.input.elementRef().nativeElement.focus();
        }
    }

    /** @hidden */
    handleKeyDown(event: KeyboardEvent, index: number): void {
        if (!this.mobile) {
            this._menuKeyboardService.keyDownHandler(event, index, this.listItems.toArray());
        }
    }

    /** @hidden */
    handleInputKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKey(event, 'ArrowDown') && !this.mobile) {
            if (event.altKey) {
                this.openChangeHandle(true);
            }
            if (this.listItems.first) {
                this.listItems.first.focus();
                event.preventDefault();
            }
        }
    }

    /** @hidden */
    handleSearchTermChange(): void {
        if (!this.open && this.searchTerm && this.searchTerm.length) {
            this.openChangeHandle(true);
        }
        this.searchTermChange.emit(this.searchTerm);
        this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
        if (this.popoverRef) {
            this.popoverRef.updatePopover();
        }
    }

    /** @hidden */
    showAllClicked(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.searchTerm = '';
        this.handleSearchTermChange();
    }

    /** @hidden */
    onSubmit(): void {
        if (this.allowNewTokens) {
            const newToken = this.newTokenParseFn(this.searchTerm);
            this.dropdownValues.push(newToken);
            this.handleSelect(true, newToken);
            this.searchTerm = '';
            this.handleSearchTermChange();
            this.open = false;
        }
    }

    /**
     * Handle dialog dismissing, closes popover and sets backup data.
     */
    dialogDismiss(selectedBackup: any[]): void {
        this.selected = [...selectedBackup];
        this.openChangeHandle(false);
        this._resetSearchTerm();
    }

    /**
     * Handle dialog approval, closes popover and propagates data changes.
     */
    dialogApprove(): void {
        this._propagateChange(true);
        this.openChangeHandle(false);
        this._resetSearchTerm();
    }

    /** @hidden */
    moreClicked() {
        this.openChangeHandle(true);
        const newDisplayedValues: any[] = [];
        this.displayedValues.forEach(value => {
            if (this.selected.indexOf(value) !== -1) {
                newDisplayedValues.push(value);
            }
        });
        this.displayedValues = newDisplayedValues;
    }

    private defaultFilter(contentArray: any[], searchTerm: string): any[] {
        const searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((item) => {
            if (item) {
                return this.displayFn(item).toLocaleLowerCase().includes(searchLower);
            }
        });
    }

    private defaultDisplay(str: string): string {
        return str;
    }

    private defaultParse(str: string): string {
        return str;
    }

    private setupFocusTrap(): void {
        try {
            this.focusTrap = focusTrap(this._elementRef.nativeElement, {
                clickOutsideDeactivates: true,
                returnFocusOnDeactivate: true,
                escapeDeactivates: false
            });
        } catch (e) {
            console.warn('Unsuccessful attempting to focus trap the Multi Input.');
        }
    }

    /**
     * @hidden
     */
    private _popoverOpenHandle(open: boolean): void {
        this.open = open;
        this.onTouched();
        if (this.open) {
            this.focusTrap.activate();
        } else {
            this.focusTrap.deactivate();
        }
    }

    /** @hidden */
    private _applyClassToCheckboxes(): void {
        this.checkboxComponents.forEach(
            _checkbox => _checkbox.labelElement.nativeElement.classList.add('fd-list__label')
        );
    }

    /** @hidden */
    private setUpCheckboxSubscription(): void {
        this._subscriptions.add(
            this.checkboxComponents.changes.subscribe(() => this._applyClassToCheckboxes())
        );
    }

    /** @hidden */
    private _propagateChange(emitInMobile?: boolean): void {
        if (!this.mobile || emitInMobile) {
            this.onChange(this.selected);
            this.selectedChange.emit(this.selected);
        }
    }

    /** @hidden */
    private _shouldPopoverBeUpdated(previousLength: number, currentLength: number): boolean {
        return !!this.popoverRef && ((previousLength === 0 && currentLength === 1) ||
            (previousLength === 1 && currentLength === 0));
    }

    /** @hidden */
    private _setUpMobileMode(): void {
        this._dynamicComponentService.createDynamicComponent(
            { listTemplate: this.listTemplate, controlTemplate: this.controlTemplate },
            MultiInputMobileComponent,
            { container: this._elementRef.nativeElement },
            { injector: Injector.create({ providers: [{ provide: MULTI_INPUT_COMPONENT, useValue: this }] }) }
        );
    }

    /** @hidden */
    private _resetSearchTerm(): void {
        this.searchTerm = '';
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private shouldFilterValues(changes): boolean {
        return this.dropdownValues && (changes.dropdownValues || changes.searchTerm);
    }


}

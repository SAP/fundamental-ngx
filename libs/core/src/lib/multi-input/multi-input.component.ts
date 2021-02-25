import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PopoverComponent } from '../popover/popover.component';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import { FormStates } from '../form/form-control/form-states';
import { applyCssClass, CssClassBuilder, DynamicComponentService, FocusEscapeDirection } from '../utils/public_api';
import { KeyUtil } from '../utils/functions';
import { PopoverFillMode } from '../popover/popover-position/popover-position';
import { MultiInputMobileComponent } from './multi-input-mobile/multi-input-mobile.component';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { MULTI_INPUT_COMPONENT, MultiInputInterface } from './multi-input.interface';
import { Subscription } from 'rxjs';
import { TokenizerComponent } from '../token/tokenizer.component';
import { ListComponent } from '../list/list.component';
import { DOWN_ARROW, TAB } from '@angular/cdk/keycodes';

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
    MultiInputInterface,
    ControlValueAccessor,
    CssClassBuilder,
    OnInit,
    OnChanges,
    AfterViewInit,
    OnDestroy {

    /** Placeholder for the input field. */
    @Input()
    placeholder = '';

    /** Whether the input is disabled. */
    @Input()
    disabled = false;

    /** Whether the input is in compact mode. */
    @Input()
    compact = false;

    /** Whether to use cozy visuals but compact collapsing behavior. */
    @Input()
    compactCollapse = false;

    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    @Input()
    maxHeight = '300px';

    /** Icon of the button on the right of the input field. */
    @Input()
    glyph = 'value-help';

    /** Values to be displayed in the unfiltered dropdown. */
    @Input()
    dropdownValues: any[] = [];

    /** Search term, or more specifically the value of the inner input field. */
    @Input()
    searchTerm = '';

    /** Whether the search term should be highlighted in results. */
    @Input()
    highlight = true;

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
    displayFn: Function = this._defaultDisplay;

    /** Parse function. Used for submitting new tokens. Accepts a string by default.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details. */
    @Input()
    newTokenParseFn: Function = this._defaultParse;

    /**
     * Validate function. Used to check if new token can be added into list.
     * Works only, when `allowNewTokens` option is enabled.
     */
    @Input()
    newTokenValidateFn: Function = this._defaultTokenValidate;

    /** Aria label for the multi input body. */
    @Input()
    multiInputBodyLabel = 'Multi input body';

    /**
     * Preset options for the Select body width, whatever is chosen, the body has a 600px limit.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control. - Default
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * 'fit-content' will apply width needed to properly display items inside, independent of control.
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
    buttonFocusable = false;

    /** Whether the multi-input allows the creation of new tokens. */
    @Input()
    allowNewTokens = false;

    /** Whether the multi-input should be built on mobile mode */
    @Input()
    mobile = false;

    /** Whether the multi-input should have show all button. */
    @Input()
    showAllButton = true;

    /** Multi Input Mobile Configuration, it's applied only, when mobile is enabled */
    @Input()
    mobileConfig: MobileModeConfig = { hasCloseButton: true, approveButtonText: 'Select' };

    /**
     * Whether or not to return results where the input matches the entire string. By default, only results that start
     * with the input search term will be returned.
     */
    @Input()
    includes = false;

    /**
     * The template with which to display the individual listed items.
     * Use it by passing an ng-template with implicit content. See examples for more info.
     */
    @Input()
    itemTemplate: TemplateRef<any>;

    /** Event emitted when the search term changes. Use *$event* to access the new term. */
    @Output()
    readonly searchTermChange: EventEmitter<string> = new EventEmitter<string>();

    /** Event emitted when the selected items change. Use *$event* to access the new selected array. */
    @Output()
    readonly selectedChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    /** Whether multi input popover body should be opened */
    @Input()
    open = false;

    /** Whether or not to display the addon button. */
    @Input()
    displayAddonButton = true;

    /** Event emitted, when the multi input's popover body is opened or closed */
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverRef: PopoverComponent;

    /** @hidden */
    @ViewChild('control', { read: TemplateRef })
    controlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('list', { read: TemplateRef })
    listTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild(ListComponent)
    listComponent: ListComponent;

    /** @hidden */
    @ViewChild('searchInputElement', { read: ElementRef })
    searchInputElement: ElementRef;

    /** @hidden */
    @ViewChild(TokenizerComponent)
    tokenizer: TokenizerComponent;

    /** @hidden */
    displayedValues: any[] = [];

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
        private _elementRef: ElementRef,
        private _changeDetRef: ChangeDetectorRef,
        private _dynamicComponentService: DynamicComponentService
    ) { }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
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
        if (this.mobile) {
            this._setUpMobileMode();
        }
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
    buildComponentCssClass(): string[] {
        return [
            'fd-multi-input',
            'fd-multi-input-custom',
            this.class
        ];
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

    /** Method passed to list component */
    handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this.searchInputElement.nativeElement.focus();
        }
    }

    /** @hidden */
    openChangeHandle(open: boolean): void {
        if (this.disabled) {
            return ;
        }

        if (!open && this.open && !this.mobile) {
            this.searchInputElement.nativeElement.focus();
        }

        if (this.open !== open) {
            this.openChange.emit(open);
        }
        this.open = open;

        if (!this.mobile) {
            this._popoverOpenHandle(open);
        }
        if (!this.open) {
            this._resetSearchTerm();
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
            // remove the token whose close button was explicitly clicked
            this.selected.splice(this.selected.indexOf(value), 1);
        }

        // Handle popover placement update
        if (this._shouldPopoverBeUpdated(previousLength, this.selected.length)) {
            this.popoverRef.refreshPosition();
        }

        this._resetSearchTerm();

        this.searchInputElement.nativeElement.focus();

        // On Mobile mode changes are propagated only on approve.
        this._propagateChange();
    }

    /** @hidden */
    handleInputKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, DOWN_ARROW) && !this.mobile) {
            if (event.altKey) {
                this.openChangeHandle(true);
            }
            if (this.listComponent) {
                this.listComponent.setItemActive(0);
                event.preventDefault();
            }
        }

        if (KeyUtil.isKeyCode(event, TAB) && this.open) {
            if (this.listComponent) {
                this.listComponent.setItemActive(0);
                event.preventDefault();
            }
        }
    }

    /** @hidden */
    handleSearchTermChange(searchTerm: string): void {
        if (this.searchTerm !== searchTerm) {
            this._applySearchTermChange(searchTerm);
            if (!this.open) {
                this.openChangeHandle(true);
            }
        }
    }

    /** @hidden */
    showAllClicked(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this._applySearchTermChange('');
    }

    /** @hidden */
    onSubmit(): void {
        if (this.allowNewTokens && this.newTokenValidateFn(this.searchTerm)) {
            const newToken = this.newTokenParseFn(this.searchTerm);
            this.dropdownValues.push(newToken);
            this.handleSelect(true, newToken);
            this._applySearchTermChange('');
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
    moreClicked(): void {
        this.openChangeHandle(true);
        const newDisplayedValues: any[] = [];
        this.displayedValues.forEach(value => {
            if (this.selected.indexOf(value) !== -1) {
                newDisplayedValues.push(value);
            }
        });
        this.displayedValues = newDisplayedValues;
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    addOnButtonClicked(): void {
        this.openChangeHandle(!this.open);
    }

    /** @hidden */
    private _applySearchTermChange(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.searchTermChange.emit(this.searchTerm);
        this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private defaultFilter(contentArray: any[], searchTerm: string = ''): any[] {
        const searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((item) => {
            if (item) {
                const term = this.displayFn(item).toLocaleLowerCase();
                let retVal;
                this.includes ? retVal = term.includes(searchLower) : retVal = term.startsWith(searchLower);
                return retVal;
            }
        });
    }

    /** @hidden */
    private _defaultDisplay(str: string): string {
        return str;
    }

    /** @hidden */
    private _defaultParse(str: string): string {
        return str;
    }

    /** @hidden */
    private _defaultTokenValidate(str: string): boolean {
        return !!str;
    }

    /**
     * @hidden
     */
    private _popoverOpenHandle(open: boolean): void {
        this.open = open;
        this.onTouched();
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

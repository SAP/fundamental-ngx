import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
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
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

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
export class MultiInputComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit, CssClassBuilder {
    /** user's custom classes */
    @Input()
    class: string;
    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverRef: PopoverComponent;

    /** @hidden */
    @ViewChildren(ListItemDirective)
    listItems: QueryList<ListItemDirective>;

    /** @hidden */
    @ViewChild('searchInputElement')
    searchInputElement: ElementRef;

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

    /**
     * Whether AddOn Button should be focusable, set to false by default
     */
    @Input()
    buttonFocusable: boolean = false;

    /**
     * Whether the multi-input allows the creation of new tokens.
     */
    @Input()
    allowNewTokens: boolean = false;

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
    displayedValues: any[] = [];

    /** @hidden */
    public focusTrap: FocusTrap;

    /** @hidden */
    onChange: Function = () => {};

    /** @hidden */
    onTouched: Function = () => {};

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private changeDetRef: ChangeDetectorRef,
        private menuKeyboardService: MenuKeyboardService
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
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.searchTerm) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
            } else {
                this.displayedValues = this.dropdownValues;
            }
        }
        this.changeDetRef.markForCheck();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.menuKeyboardService.focusEscapeBeforeList = () => this.searchInputElement.nativeElement.focus();
        this.menuKeyboardService.focusEscapeAfterList = () => {};
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
        this.changeDetRef.detectChanges();
    }

    /** @hidden */
    writeValue(selected: any[]): void {
        if (selected) {
            this.selected = selected;
        }
        this.changeDetRef.markForCheck();
    }

    /** @hidden */
    openChangeHandle(open: boolean): void {
        this.open = open;
        this.openChange.emit(this.open);
        this.onTouched();
        if (this.open) {
            this.focusTrap.activate();
        } else {
            this.focusTrap.deactivate();
        }
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
        if (
            (previousLength === 0 && this.selected.length === 1) ||
            (previousLength === 1 && this.selected.length === 0)
        ) {
            this.popoverRef.updatePopover();
        }

        this.onChange(this.selected);
        this.selectedChange.emit(this.selected);
    }

    /** @hidden */
    public handleKeyDown(event: KeyboardEvent, index: number): void {
        this.menuKeyboardService.keyDownHandler(event, index, this.listItems.toArray());
    }

    /** @hidden */
    public handleInputKeydown(event: KeyboardEvent): void {
        if (event.key === 'ArrowDown') {
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
        this.popoverRef.updatePopover();
    }

    /** @hidden */
    showAllClicked(event: MouseEvent): void {
        event.preventDefault();
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
}

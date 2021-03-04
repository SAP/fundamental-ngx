import {
    AfterViewInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Host,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    Self,
    SkipSelf,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';

import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
    FocusEscapeDirection,
    KeyUtil,
    ListComponent,
    MobileModeConfig,
    TemplateDirective,
    PopoverFillMode
} from '@fundamental-ngx/core';
import {
    isOptionItem,
    OptionItem
} from '../../../../domain';

import { isJsObject, isString } from '../../../../utils/lang';
import { CollectionBaseInput } from '../../collection-base.input';
import { SelectComponent } from '../select/select.component';
import { SelectConfig } from '../select.config';
import { ContentDensity, FormFieldControl } from '../../form-control';
import { FormField } from '../../form-field';
import { TextAlignment } from '../../combobox';

export type FdpSelectData<T> = OptionItem[] | Observable<T[]> | T[];

export class FdpSelectionChangeEvent {
    constructor(
        public source: SelectComponent,
        public payload: any // Contains selected item
    ) {}
}

@Directive()
export abstract class BaseSelect extends CollectionBaseInput implements AfterViewInit, OnDestroy {
   
    /** Provides maximum default height for the optionPanel */
    @Input()
    maxHeight = '250px';

    /** Whether the select should be built on mobile mode */
    @Input()
    mobile = false;

    /** Tells the select if we need to group items */
    @Input()
    group = false;

    /** A field name to use to group data by (support dotted notation) */
    @Input()
    groupKey?: string;

    /** The field to show data in secondary column */
    @Input()
    secondaryKey?: string;

    /** Show the second column (Applicable for two columns layout) */
    @Input()
    showSecondaryText = false;

    /** Glyph to add icon in the select component. */
    @Input()
    glyph = 'slim-arrow-down';

    /** The element to which the popover should be appended. */
    @Input()
    appendTo: ElementRef;

    @Input()
    triggerValue: String;

    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /** Horizontally align text inside the second column (Applicable for two columns layout) */
    @Input()
    secondaryTextAlignment: TextAlignment = 'right';

    /**
     * Max width of list container
     * */
    @Input()
    width: string;

    /** Whether the select component is disabled. */
    @Input()
    stateMessage: string;

    /** Whether the select component is readonly. */
    @Input()
    readonly = false;

    /** Placeholder for the select. Appears in the 
    * triggerbox if no option is selected. */
    @Input()
    placeholder: string;

    /** Whether the select is in compact mode. */
    @Input()
    compact = false;

    /** Whether close the popover on outside click. */
    @Input()
    closeOnOutsideClick = true;

    /** Custom template used to build control body. */
    @Input()
    controlTemplate: TemplateRef<any>;

    /** Binds to control aria-labelledBy attribute */
    @Input()
    ariaLabelledBy = null;

    /** Sets control aria-label attribute value */
    @Input()
    ariaLabel = null;

    /** Select Input Mobile Configuration */
    @Input()
    mobileConfig: MobileModeConfig = { hasCloseButton: true };

    /**
     * String rendered as first value in the popup which let the user to make 'no selection' from
     * available list of values. When this option is active and use make this selection we save a
     * NULL value
     */
    @Input()
    noValueLabel: string;

    @Input()
    noWrapText = false;

    /** Turns on/off Adjustable Width feature */
    @Input()
    autoResize = false;

    /** First Column ratio */
    @Input()
    firstColumnRatio: number;

    /** Secoond Column ratio */
    @Input()
    secondColumnRatio: number;

    /**
     * Min width of list container
     *
     * */
    @Input()
    minWidth?: number;

    /**
    * Max width of list container
    * */
    @Input()
    maxWidth?: number;

    /**
     * content Density of element. 'cozy' | 'compact'
     */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
        this.isCompact = contentDensity === 'compact';
    }

    /** Data for suggestion list */
    get list(): any {
        return this._optionItems;
    }

    set list(value: any) {
        if (value) {
            this._optionItems = this._convertToOptionItems(value);
        }
    }

    /** Event emitted when item is selected. */
    @Output()
    selectionChange = new EventEmitter<FdpSelectionChangeEvent>();

    /** @hidden */
    @ViewChild(ListComponent)
    listComponent: ListComponent;

    /** @hidden */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    /** Custom Option item Template
     * * @hidden
     * */
    _optionItemTemplate: TemplateRef<any>;

    /**
     * Custom Secondary item Template
     * @hidden
     * */
    _secondaryItemTemplate: TemplateRef<any>;

    /**
     * Custom Selected option item Template
     * @hidden
     * */
    _selectedItemTemplate: TemplateRef<any>;

    /** @hidden */
    searchInputElement: ElementRef;

    /** @hidden */
    _contentDensity: ContentDensity = this.selectConfig.contentDensity;

    /**
     * @hidden
     * Whether "contentDensity" is "compact"
     */
    isCompact: boolean = this._contentDensity === 'compact';

    /** Whether the select is opened. */
    isOpen = false;

    get canClose(): boolean {
        return !(this.mobile && this.mobileConfig.approveButtonText);
    }

    /**
     * List of option items
     * @hidden
     * */
    _optionItems: OptionItem[];

    /**
     * Need for opening mobile version
     *
     * @hidden
     */
    openChange = new Subject<boolean>();

    /** @hidden */
    private _dsSubscription?: Subscription;

    /** @hidden */
    private _element: HTMLElement = this.elementRef.nativeElement;


    constructor(
        readonly cd: ChangeDetectorRef,
        protected readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @Self() readonly ngForm: NgForm,
        protected selectConfig: SelectConfig,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, ngControl, ngForm, formField, formControl);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._initWindowResize();
        this._assignCustomTemplates();
        super.ngAfterViewInit();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();

        if (this._dsSubscription) {
            this._dsSubscription.unsubscribe();
        }
    }

    /**
     * Method to emit change event
     * @hidden
     */
    abstract _emitChangeEvent<K>(value: K): void;

    /**
     * Define is this item selected
     * @hidden
     */
    abstract _isSelectedOptionItem(selectedItem: OptionItem): boolean;

    /**
     * Emit select OptionItem
     * @hidden
     * */
    abstract _selectOptionItem(item: OptionItem): void;

    /**
     * Define value as selected
     * @hidden
     * */
    abstract _setAsSelected(item: OptionItem[]): void;

    /** Is empty search field */
    get isEmptyValue(): boolean {
        return this.value.trim().length === 0;
    }

    /** write value for ControlValueAccessor */
    writeValue(value: any): void {
        if (!value) {
            return;
        }

        const selectedItems = Array.isArray(value) ? value : [value];
        this._setAsSelected(this._convertToOptionItems(selectedItems));
        super.writeValue(value);
    }

    /** @hidden
     * Close list * */
    close(event: MouseEvent = null, forceClose: boolean = false): void {
        if (event) {
            const target = event.target as HTMLInputElement;
            if (target && target.id === this.id) {
                return;
            }
        }

        if (this.isOpen && (forceClose || this.canClose)) {
            this.isOpen = false;
            this.openChange.next(this.isOpen);
            this.cd.markForCheck();
            this.onTouched();
        }
    }


    /** @hidden */
    showList(isOpen: boolean): void {
        if (this.isOpen !== isOpen) {
            this.isOpen = isOpen;
            this.onTouched();
            this.openChange.next(isOpen);
        }

        this.cd.detectChanges();
    }

    /** @hidden */
    handleOptionItem(value: OptionItem): void {
        if (value) {
            this._selectOptionItem(value);
        }
    }

    /** @hidden */
    handlePressEnter(event: KeyboardEvent, value: OptionItem): void {
        if (!KeyUtil.isKeyCode(event, ENTER)) {
            return;
        }

        this.handleOptionItem(value);
    }


    /** Method passed to list component */
    handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this.searchInputElement.nativeElement.focus();
        }
    }


    /** @hidden */
    private _initWindowResize(): void {
        this._getOptionsListWidth();

        if (!this.autoResize) {
            return;
        }

        fromEvent(window, 'resize')
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._getOptionsListWidth());
    }

    /** @hidden */
    private _getOptionsListWidth(): void {
        const body = document.body;
        const rect = this._element
            .getBoundingClientRect();
        const scrollBarWidth = body.offsetWidth - body.clientWidth;
        this.maxWidth = (window.innerWidth - scrollBarWidth) - rect.left;
        this.minWidth = rect.width - 2;
    }

    /**
     * Convert original data to OptionItems Interface
     * @hidden
     */
    private _convertToOptionItems(items: any[]): OptionItem[] {
        const item = items[0];

        const elementTypeIsOptionItem = isOptionItem(item);
        if (elementTypeIsOptionItem) {
            return items as OptionItem[];
        }

        const elementTypeIsObject = isJsObject(item);
        if (elementTypeIsObject) {
            return this._convertObjectsToOptionItems(items);
        }

        const elementTypeIsString = isString(item);
        if (elementTypeIsString) {
            return this._convertPrimitiveToOptionItems(items);
        }

        return [];
    }

    /**
     * Convert data to OptionItems Interface
     * @hidden
     */
    private _convertObjectsToOptionItems(items: any[]): OptionItem[] {
        // if (this.group && this.groupKey) {
        //     return this._convertObjectsToGroupOptionItems(items);
        // } else 
        if (this.showSecondaryText && this.secondaryKey) {
            return this._convertObjectsToSecondaryOptionItems(items);
        } else {
            return this._convertObjectsToDefaultOptionItems(items);
        }
    }


    /**
     * Convert object[] data to Secondary OptionItems Interface
     * @hidden
     */
    private _convertObjectsToSecondaryOptionItems<K>(items: K[]): OptionItem[] {
        const selectItems: OptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: this.displayValue(value),
                secondaryText: this.objectGet(value, this.secondaryKey),
                value: value
            });
        }

        return selectItems;
    }

    /**
     * Convert Primitive data(Boolean, String, Number) to OptionItems Interface
     * @hidden
     */
    private _convertPrimitiveToOptionItems(items: any[]): OptionItem[] {
        const selectItems: OptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({ label: value, value: value });
        }

        return selectItems;
    }

    /**
     * Convert object[] to OptionItems Interface (Default)
     * @hidden
     */
    private _convertObjectsToDefaultOptionItems(items: any[]): OptionItem[] {
        const selectItems: OptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: this.displayValue(value),
                value: value
            });
        }

        return selectItems;
    }

    /** @hidden
     * Assign custom templates
     * */
    private _assignCustomTemplates(): void {
        this.customTemplates.forEach(template => {
            switch (template.getName()) {
                case '_optionItemTemplate':
                    this._optionItemTemplate = template.templateRef;
                    break;
                case '_secondaryItemTemplate':
                    this._secondaryItemTemplate = template.templateRef;
                    break;
                case '_selectedItemTemplate':
                    this._selectedItemTemplate = template.templateRef;
                    break;
            }
        });
    }
}

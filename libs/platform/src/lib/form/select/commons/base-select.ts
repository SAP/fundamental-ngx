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
    OnInit,
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
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PopoverFillMode } from '@fundamental-ngx/core/shared';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { ListComponent } from '@fundamental-ngx/core/list';
import { ContentDensityService, FocusEscapeDirection, KeyUtil, TemplateDirective } from '@fundamental-ngx/core/utils';
import {
    CollectionBaseInput,
    FormField,
    FormFieldControl,
    isJsObject,
    isOptionItem,
    isString
} from '@fundamental-ngx/platform/shared';
import { SelectConfig } from '../select.config';
import { TextAlignment } from '../../combobox';
import { SelectOptionItem } from './../models/select.models';

export type FdpSelectData<T> = SelectOptionItem[] | Observable<T[]> | T[];

/**
 * @deprecated
 * `FdpSelectionChangeEvent` will be removed in future versions in favour of plain value emission
 */
export class FdpSelectionChangeEvent {
    constructor(
        public payload: any // Contains selected item
    ) {}
}

@Directive()
export abstract class BaseSelect extends CollectionBaseInput implements OnInit, AfterViewInit, OnDestroy {
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
    triggerValue: string;

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

    /** Whether the select component is readonly. */
    @Input()
    readonly = false;

    /** Placeholder for the select. Appears in the
     * triggerbox if no option is selected. */
    @Input()
    placeholder: string;

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
    set firstColumnRatio(value: number) {
        this._firstColumnRatio = coerceNumberProperty(value);
    }

    get firstColumnRatio(): number {
        return this._firstColumnRatio;
    }

    /** Secoond Column ratio */
    @Input()
    set secondColumnRatio(value: number) {
        this._secondColumnRatio = coerceNumberProperty(value);
    }

    get secondColumnRatio(): number {
        return this._secondColumnRatio;
    }

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

    /** Data for suggestion list */
    @Input()
    get list(): any {
        return this._optionItems;
    }

    set list(value: any) {
        if (value) {
            this._optionItems = this._convertToOptionItems(value);
        }
    }

    get canClose(): boolean {
        return !(this.mobile && this.mobileConfig.approveButtonText);
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
    _contentDensityService: ContentDensityService;

    /**
     * List of option items
     * @hidden
     * */
    _optionItems: SelectOptionItem[];

    /** @hidden */
    _subscriptions = new Subscription();

    /** @hidden */
    private _searchInputElement: ElementRef;

    /** Whether the select is opened. */
    private _isOpen = false;

    /**
     * Need for opening mobile version
     *
     * @hidden
     */
    private _openChange = new Subject<boolean>();

    /** @hidden */
    private _dsSubscription?: Subscription;

    /** @hidden */
    private _element: HTMLElement = this.elementRef.nativeElement;

    /** @hidden */
    private _firstColumnRatio: number;

    /** @hidden */
    private _secondColumnRatio: number;

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

    /** @hidden
     * extended by super class
     */
    ngOnInit(): void {
        if (this.contentDensity === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._contentDensityListener.subscribe((density) => {
                    this.contentDensity = density;
                    this.cd.markForCheck();
                })
            );
        }
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

        this._subscriptions.unsubscribe();

        if (this._dsSubscription) {
            this._dsSubscription.unsubscribe();
        }
    }

    /** Is empty search field */
    get isEmptyValue(): boolean {
        return this.value.trim().length === 0;
    }

    protected setValue(newValue: any, emitOnChange = true): void {
        if (newValue !== this._value) {
            this.writeValue(newValue);
            if (emitOnChange) {
                this.onChange(this.value);
                this.onTouched();
                this.selectionChange.emit({ payload: this.value });
            }
            this.cd.markForCheck();
        }
    }

    /** @hidden
     * Close list * */
    close(event: MouseEvent|null = null, forceClose: boolean = false): void {
        if (event) {
            const target = event.target as HTMLInputElement;
            if (target && target.id === this.id) {
                return;
            }
        }

        if (this._isOpen && (forceClose || this.canClose)) {
            this._isOpen = false;
            this._openChange.next(this._isOpen);
            this.cd.markForCheck();
            this.onTouched();
        }
    }

    /** @hidden */
    showList(isOpen: boolean): void {
        if (this._isOpen !== isOpen) {
            this._isOpen = isOpen;
            this.onTouched();
            this._openChange.next(isOpen);
        }

        this.cd.detectChanges();
    }

    /** @hidden */
    handlePressEnter(event: KeyboardEvent, value: SelectOptionItem): void {
        if (!KeyUtil.isKeyCode(event, ENTER)) {
            return;
        }

        this.setValue(value);
    }

    /** Method passed to list component */
    handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this._searchInputElement.nativeElement.focus();
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
        const rect = this._element.getBoundingClientRect();
        const scrollBarWidth = body.offsetWidth - body.clientWidth;
        this.maxWidth = window.innerWidth - scrollBarWidth - rect.left;
        this.minWidth = rect.width - 2;
    }

    /**
     * Convert original data to OptionItems Interface
     * @hidden
     */
    private _convertToOptionItems(items: any[]): SelectOptionItem[] {
        const item = items[0];

        const elementTypeIsOptionItem = isOptionItem(item);
        if (elementTypeIsOptionItem) {
            return items as SelectOptionItem[];
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
    private _convertObjectsToOptionItems(items: any[]): SelectOptionItem[] {
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
    private _convertObjectsToSecondaryOptionItems<K>(items: K[]): SelectOptionItem[] {
        const selectItems: SelectOptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: this.displayValue(value),
                secondaryText: this.objectGet(value, this.secondaryKey),
                value: this.lookupValue(value)
            });
        }

        return selectItems;
    }

    /**
     * Convert Primitive data(Boolean, String, Number) to OptionItems Interface
     * @hidden
     */
    private _convertPrimitiveToOptionItems(items: string[]): SelectOptionItem[] {
        const selectItems: SelectOptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({ label: value, value });
        }

        return selectItems;
    }

    /**
     * Convert object[] to OptionItems Interface (Default)
     * @hidden
     */
    private _convertObjectsToDefaultOptionItems(items: any[]): SelectOptionItem[] {
        const selectItems: SelectOptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: this.displayValue(value),
                value
            });
        }

        return selectItems;
    }

    /** @hidden
     * Assign custom templates
     * */
    private _assignCustomTemplates(): void {
        this.customTemplates.forEach((template) => {
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

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import {
    DIALOG_CONFIG,
    DialogConfig,
    DynamicComponentService,
    MenuKeyboardService,
    MobileModeConfig,
    TemplateDirective
} from '@fundamental-ngx/core';
import { ComboBoxDataSource, DATA_PROVIDERS, DataProvider } from '../../../../domain/data-source';
import { ContentDensity, FormFieldControl } from '../../form-control';
import { BaseCombobox, ComboboxSelectionChangeEvent } from '../commons/base-combobox';
import { ComboboxConfig } from '../combobox.config';
import { OptionItem } from '../../../../domain';

@Component({
    selector: 'fdp-combobox',
    templateUrl: './combobox.component.html',
    styleUrls: ['./combobox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: ComboboxComponent, multi: true }]
})
export class ComboboxComponent extends BaseCombobox<string> implements OnInit, AfterViewInit {
    /** Whether the autocomplete should be enabled; Enabled by default */
    @Input()
    autoComplete = true;

    /**
     * content Density of element. 'cozy' | 'compact'
     */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
        this.isCompact = contentDensity === 'compact';
    }

    /**
     * Todo: Name of the entity for which DataProvider will be loaded. You can either pass list of
     * items or use this entityClass and internally we should be able to do lookup to some registry
     * and retrieve the best matching DataProvider that is set on application level
     */
    @Input()
    entityClass: string;

    /** Whether the combobox is readonly. */
    @Input()
    readOnly = false;

    /** Whether the combobox should be built on mobile mode */
    @Input()
    mobile = false;

    /** Multi Input Mobile Configuration, it's applied only, when mobile is enabled */
    @Input()
    mobileConfig: MobileModeConfig;

    /** Tells the combo if we need to group items */
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

    /** Horizontally align text inside the second column (Applicable for two columns layout) */
    @Input()
    secondaryTextAlignment: 'left' | 'center' | 'right' = 'right';

    /** Turns on/off Adjustable Width feature */
    @Input()
    autoResize = false;

    /** @hidden */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    /** @hidden */
    @ViewChild('searchInputElement')
    searchInputElement: ElementRef;

    /** @hidden */
    @ViewChild('controlTemplate')
    controlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    listTemplate: TemplateRef<any>;

    /** @hidden */
    optionItemTemplate: TemplateRef<any>;

    /** @hidden */
    groupItemTemplate: TemplateRef<any>;

    /** @hidden */
    secondaryItemTemplate: TemplateRef<any>;

    /** @hidden */
    selectedItemTemplate: TemplateRef<any>;

    @Output()
    selectionChange = new EventEmitter<ComboboxSelectionChangeEvent>();

    /** @hidden */
    _contentDensity: ContentDensity = this._comboboxConfig.contentDensity;

    /**
     * @hidden
     * Whether "contentDensity" is "compact"
     */
    isCompact: boolean = this._contentDensity === 'compact';

    /** @hidden */
    protected selected = '';

    get isGroup(): boolean {
        return !!(this.group && this.groupKey);
    }

    constructor(
        readonly _cd: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @Self() readonly ngForm: NgForm,
        @Optional() @Inject(DIALOG_CONFIG) readonly dialogConfig: DialogConfig,
        readonly _dynamicComponentService: DynamicComponentService,
        @Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
        protected _menuKeyboardService: MenuKeyboardService,
        readonly _comboboxConfig: ComboboxConfig
    ) {
        super(_cd, elementRef, ngControl, ngForm, dialogConfig, _dynamicComponentService, _menuKeyboardService, _comboboxConfig);
    }

    /** @hidden */
    ngOnInit(): void {
        const providers = this.providers.size === 0 ? this._comboboxConfig.providers : this.providers;
        // if we have both prefer dataSource
        if (!this.dataSource && this.entityClass && providers.has(this.entityClass)) {
            this.dataSource = new ComboBoxDataSource(providers.get(this.entityClass));
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._assignCustomTemplates();
        super.ngAfterViewInit();
    }

    /** @hidden
     * Method to emit change event
     */
    emitChangeEvent<T>(modelValue: T): void {
        const event = new ComboboxSelectionChangeEvent(this, modelValue);
        event.source = this;
        event.payload = modelValue;

        this.selectionChange.emit(event);
    }

    /** @hidden
     * Method to set selected item
     */
    selectOptionItem(item: OptionItem): void {
        this.showList(false);

        this._checkAndUpdate(item);
    }

    /** @hidden
     * Method to set as selected
     */
    setAsSelected(item: OptionItem[]): void {
        const optionItem = item[0];

        if (this.isSelectedOptionItem(optionItem)) {
            return;
        }

        this.inputTextValue = this.displayValue(optionItem);
        this.selected = this.lookupValue(optionItem) || this.inputTextValue;

        this._updateModel(optionItem.value);
    }

    /** @hidden
     * Define is selected item selected
     */
    isSelectedOptionItem(selectedItem: OptionItem): boolean {
        return this.selected === this.lookupValue(selectedItem) || this.selected === selectedItem.label;
    }

    /** @hidden
     * if not selected update model
     */
    private _checkAndUpdate(modelValue: OptionItem): void {
        if (this.isSelectedOptionItem(modelValue)) {
            return;
        }

        this._updateModel(modelValue.value);
    }

    /** @hidden
     * Update model
     */
    private _updateModel(value: any): void {
        // setting value, it will call setValue()
        this.value = value;

        this.emitChangeEvent(value);
    }

    /** @hidden
     * Assign custom templates
     * */
    private _assignCustomTemplates(): void {
        this.customTemplates.forEach(template => {
            switch (template.getName()) {
                case 'optionItemTemplate':
                    this.optionItemTemplate = template.templateRef;
                    break;
                case 'groupItemTemplate':
                    this.groupItemTemplate = template.templateRef;
                    break;
                case 'secondaryItemTemplate':
                    this.secondaryItemTemplate = template.templateRef;
                    break;
                case 'selectedItemTemplate':
                    this.selectedItemTemplate = template.templateRef;
                    break;
            }
        });
    }
}

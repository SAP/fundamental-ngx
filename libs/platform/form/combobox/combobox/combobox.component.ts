import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    Inject,
    Injector,
    OnInit,
    Optional,
    Output,
    Self,
    SkipSelf,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlContainer, FormsModule, NgControl, NgForm } from '@angular/forms';
import { FD_FORM_FIELD, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';

import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import {
    ComboBoxDataSource,
    DATA_PROVIDERS,
    DataProvider,
    OptionItem,
    PlatformFormField,
    PlatformFormFieldControl
} from '@fundamental-ngx/platform/shared';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { SearchHighlightPipe } from '@fundamental-ngx/cdk/utils';
import { FormInputMessageGroupComponent, FormMessageComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule, ListSecondaryDirective } from '@fundamental-ngx/core/list';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { AutoCompleteDirective } from '../../auto-complete/auto-complete.directive';
import { ComboboxMobileComponent } from '../combobox-mobile/combobox/combobox-mobile.component';
import { ComboboxConfig } from '../combobox.config';
import { COMBOBOX_COMPONENT, ComboboxInterface } from '../combobox.interface';
import { BaseCombobox } from '../commons/base-combobox';

export class ComboboxSelectionChangeEvent {
    /**
     * Combobox selection event
     * @param source Combobox component
     * @param payload Selected option
     */
    constructor(
        public source: ComboboxComponent,
        public payload: any // Contains selected item
    ) {}
}

@Component({
    selector: 'fdp-combobox',
    templateUrl: './combobox.component.html',
    styleUrl: './combobox.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: FD_FORM_FIELD_CONTROL, useExisting: ComboboxComponent, multi: true },
        contentDensityObserverProviders()
    ],
    standalone: true,
    imports: [
        NgTemplateOutlet,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        FormInputMessageGroupComponent,
        InputGroupModule,
        FormsModule,
        AutoCompleteDirective,
        FormMessageComponent,
        ListModule,
        NgClass,
        ListSecondaryDirective,
        SearchHighlightPipe,
        FdTranslatePipe,
        ContentDensityModule
    ]
})
export class ComboboxComponent extends BaseCombobox implements ComboboxInterface, OnInit, AfterViewInit {
    /** Event emitted when item is selected. */
    @Output()
    selectionChange = new EventEmitter<ComboboxSelectionChangeEvent>();
    /** @ignore */
    @ViewChild('searchInputElement')
    searchInputElement: ElementRef<HTMLInputElement>;

    /** @ignore */
    @ViewChild('controlTemplate')
    controlTemplate: TemplateRef<any>;

    /** @ignore */
    @ViewChild('listTemplate')
    listTemplate: TemplateRef<any>;

    /** @ignore */
    _selectedElement?: OptionItem;

    /** @ignore */
    constructor(
        readonly cd: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @SkipSelf() readonly controlContainer: ControlContainer,
        @Optional() @Self() readonly ngForm: NgForm,
        @Optional() readonly dialogConfig: DialogConfig,
        readonly _dynamicComponentService: DynamicComponentService,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
        @Optional() @Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
        readonly _comboboxConfig: ComboboxConfig,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD) formField: PlatformFormField,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD_CONTROL) formControl: PlatformFormFieldControl
    ) {
        super(
            cd,
            elementRef,
            ngControl,
            controlContainer,
            ngForm,
            dialogConfig,
            _comboboxConfig,
            formField,
            formControl
        );
    }
    /** @ignore */
    ngOnInit(): void {
        super.ngOnInit();
        const providers = this.providers?.size === 0 ? this._comboboxConfig.providers : this.providers;
        // if we have both prefer dataSource
        if (!this.dataSource && this.entityClass && providers?.has(this.entityClass)) {
            this.dataSource = new ComboBoxDataSource(providers.get(this.entityClass)!);
        }
    }

    /** @ignore */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @ignore */
    _onBlur(event: FocusEvent): void {
        if (this.mobile) {
            return;
        }

        const target = event.relatedTarget as HTMLElement;
        if (target) {
            const isList = !!target.closest('.fdp-combobox__list-container');
            const isListItem = !!target.closest('.fd-list__item');
            if (isList || isListItem) {
                return;
            }
        }

        if ((!this._selectedElement && !this.inputText) || this._selectedElement?.label === this.inputText) {
            return;
        }

        const optionItem = this._getSelectedOptionItem(this.inputText);

        this._updateModel(optionItem ? optionItem.value : this.inputText);
    }

    /** @ignore Method to emit change event */
    emitChangeEvent<T>(modelValue: T): void {
        const event = new ComboboxSelectionChangeEvent(this, modelValue);

        this.selectionChange.emit(event);
    }

    /** @ignore Method to set selected item */
    selectOptionItem(item: OptionItem): void {
        if (this.mobile) {
            this._selectedElement = item;
            this.inputText = item.label;
            this.cd.detectChanges();

            return;
        }

        this.inputText = item.label;
        this._checkAndUpdate(item);
        this.isOpenChangeHandle(false);
    }

    /** @ignore Method to set as selected */
    setAsSelected(item: OptionItem[]): void {
        const selectedItem = item[0];

        if (this.isSelectedOptionItem(selectedItem)) {
            return;
        }

        this._selectedElement = (this.isGroup && selectedItem?.children?.[0]) || selectedItem;
        this.inputText = this.displayValue(this._selectedElement);
    }

    /** @ignore Define is selected item selected */
    isSelectedOptionItem(selectedItem: any): boolean {
        return (
            (this.lookupKey && this.lookupValue(this._selectedElement) === this.lookupValue(selectedItem)) ||
            this.displayValue(this._selectedElement) === this.displayValue(selectedItem)
        );
    }

    /** @ignore Define is selected item selected by display value */
    isSelectedOptionItemByDisplayValue(selectedItem: any): boolean {
        return this._selectedElement?.label === selectedItem;
    }

    /** Handle dialog dismissing, closes popover and sets backup data. */
    dialogDismiss(term: string): void {
        if (this._selectedElement?.label !== term) {
            this._selectedElement = this._getSelectedOptionItem(term);
        }

        this.inputText = term;
        this.isOpenChangeHandle(false);
    }

    /** Handle dialog approval, closes popover and propagates data changes. */
    dialogApprove(): void {
        if (this._selectedElement?.label === this.inputText) {
            this._updateModel(this._selectedElement.value);
        } else {
            const optionItem = this._getSelectedOptionItem(this.inputText);

            this._updateModel(optionItem ? optionItem.value : this.inputText);
        }

        this.isOpenChangeHandle(false);
    }

    /** @ignore if not selected update model */
    private _checkAndUpdate(modelValue: OptionItem): void {
        if (this.isSelectedOptionItem(modelValue)) {
            return;
        }

        const optionItem = this._getSelectedOptionItem(this.inputText);

        this._updateModel(optionItem ? optionItem.value : this.inputText);
    }

    /** @ignore Update model */
    private _updateModel(value: any): void {
        // setting value, it will call setValue()
        this.value = value;

        this.emitChangeEvent(value ? value : null);
    }

    /** @ignore */
    private async _setUpMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: COMBOBOX_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._dynamicComponentService.createDynamicComponent(
            { listTemplate: this.listTemplate, controlTemplate: this.controlTemplate },
            ComboboxMobileComponent,
            {
                containerRef: this._viewContainerRef
            },
            { injector }
        );
    }

    /** @ignore */
    private _getSelectedOptionItem(text: string): OptionItem | undefined {
        if (!this.isGroup) {
            return this._suggestions.find((item) => item.label === text);
        }

        return this._suggestions
            .reduce((result: OptionItem[], item: OptionItem) => {
                result.push(...(item.children ?? []));

                return result;
            }, [])
            .find((item) => item.label === text);
    }
}

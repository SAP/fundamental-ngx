/* eslint-disable @typescript-eslint/member-ordering */
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Injector,
    Input,
    OnInit,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { DisplayFnPipe, DynamicComponentService, InitialFocusDirective, KeyUtil } from '@fundamental-ngx/cdk/utils';
import { TokenComponent, TokenizerComponent } from '@fundamental-ngx/core/token';
import {
    BaseListItem,
    ListComponent,
    ModifyItemEvent,
    PlatformListModule,
    SelectionType,
    StandardListItemComponent
} from '@fundamental-ngx/platform/list';
import {
    DATA_PROVIDERS,
    DataProvider,
    MultiInputDataSource,
    MultiInputOption,
    isFunction
} from '@fundamental-ngx/platform/shared';

import { NgTemplateOutlet } from '@angular/common';
import {
    ContentDensityModule,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { MultiAnnouncerDirective } from '@fundamental-ngx/core/multi-combobox';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import equal from 'fast-deep-equal';
import { AutoCompleteDirective, AutoCompleteEvent } from '../auto-complete/auto-complete.directive';
import { InputType } from '../input/input.component';
import { BaseMultiInput } from './base-multi-input';
import { PlatformMultiInputMobileComponent } from './multi-input-mobile/multi-input-mobile.component';
import { MULTIINPUT_COMPONENT } from './multi-input.interface';

let uniqueHiddenLabel = 0;

export class MultiInputSelectionChangeEvent {
    /**
     * Multi Input selection change event
     * @param source Multi Input component
     * @param payload Selected value
     */
    constructor(
        public source: PlatformMultiInputComponent,
        public payload: any // Contains selected item
    ) {}
}

@Component({
    selector: 'fdp-multi-input',
    templateUrl: './multi-input.component.html',
    styleUrl: './multi-input.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_FORM_FIELD_CONTROL,
            useExisting: forwardRef(() => PlatformMultiInputComponent),
            multi: true
        },
        contentDensityObserverProviders()
    ],
    imports: [
        NgTemplateOutlet,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        InputGroupModule,
        TokenComponent,
        TokenizerComponent,
        FormControlComponent,
        FormsModule,
        AutoCompleteDirective,
        InitialFocusDirective,
        PlatformListModule,
        StandardListItemComponent,
        DisplayFnPipe,
        ContentDensityModule,
        FdTranslatePipe,
        MultiAnnouncerDirective
    ]
})
export class PlatformMultiInputComponent extends BaseMultiInput implements OnInit, AfterViewInit {
    /** @hidden TODO: remove when permanently deleting the deprecated tokenHiddenId input */
    protected tokenCountHiddenLabel = `fdp-multi-input-token-count-id-${uniqueHiddenLabel++}`;

    /** @deprecated Now handled internally by tokenizer. */
    @Input()
    tokenHiddenId: string = this.tokenCountHiddenLabel;

    /** type Represent the type of input used for the multi Input */
    @Input()
    type: InputType;

    /** boolean type represents the focus set for the respective multi input */
    @Input()
    autofocus = false;

    /**  */
    @Input()
    glyphAriaLabel: string;

    /** Title text for the add-on icon button. */
    @Input()
    addonIconTitle: string;

    /** @hidden */
    @ViewChild(ListComponent)
    listTemplateDD: ListComponent<MultiInputOption>;

    /** Selected values from the list items. */
    _selected: any[] = [];

    /** Selected items of the multi input. */
    @Input()
    set selected(selectedValue: any[]) {
        this.value = selectedValue;
    }
    get selected(): any[] {
        return this._selected;
    }

    /**
     *
     */
    @Input()
    selectionMode: SelectionType = 'none';

    /** Whether the list in byline mode. */
    @Input()
    hasByLine = false;

    /** @hidden */
    selectedValue?: MultiInputOption;

    /** @hidden */
    get isGroup(): boolean {
        return !!(this.group && this.groupKey);
    }

    /** @hidden Whether the input is disabled. */
    protected _disabled = false;

    /** Whether the multi input is disabled. */
    @Input()
    set disabled(value) {
        this._disabled = value;
    }
    get disabled(): boolean {
        return this._disabled;
    }

    /**
     * Preset options for the Select body width, whatever is chosen, the body has a 600px limit.
     * `at-least` will apply a minimum width to the body equivalent to the width of the control. - Default
     * `equal` will apply a width to the body equivalent to the width of the control.
     * 'fit-content' will apply width needed to properly display items inside, independent of control.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /**
     * The trigger events that will open/close the options popover.
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    triggers: string[] = [];

    /** Whether the combobox should close, when a click is performed outside its boundaries. True by default */
    @Input()
    closeOnOutsideClick = true;

    /** Callback function when add-on button clicked. */
    @Input()
    addOnButtonClickFn: () => void;

    /** Event emitted when item is selected. */
    @Output()
    readonly selectionChange = new EventEmitter<MultiInputSelectionChangeEvent>();

    /** @hidden */
    @ViewChild(TokenizerComponent)
    tokenizer: TokenizerComponent;

    /** @hidden */
    @ViewChild('controlTemplate')
    controlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    listTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChildren(BaseListItem)
    private readonly _listItems: QueryList<BaseListItem>;

    /** @hidden */
    constructor(
        /** @hidden */
        readonly _dynamicComponentService: DynamicComponentService,
        /** @hidden */
        private readonly _viewContainerRef: ViewContainerRef,
        /** @hidden */
        private readonly _injector: Injector,
        /** @hidden */
        @Optional() @Inject(DATA_PROVIDERS) private _providers: Map<string, DataProvider<any>>,
        readonly contentDensityObserver: ContentDensityObserver
    ) {
        super();
    }

    /** Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details. */
    @Input()
    displayFn = (str: string): string => str;

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();

        const providers = this._providers?.size === 0 ? this.multiInputConfig.providers : this._providers;
        // if we have both prefer dataSource
        if (!this.dataSource && this.entityClass && providers?.has(this.entityClass)) {
            this.dataSource = new MultiInputDataSource(providers.get(this.entityClass)!);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @hidden Method to emit change event */
    emitChangeEvent<T>(modelValue: T): void {
        const event = new MultiInputSelectionChangeEvent(this, modelValue);

        this.selectionChange.emit(event);
    }

    /** @hidden */
    _checkboxSelected(value: any, event: ModifyItemEvent): void {
        const isSelected = event.source._selected;
        const index = this.selected.findIndex((selectvalue) => equal(selectvalue, value));

        if (isSelected && index > -1) {
            return;
        }

        this.addToArray(value, false);
    }

    /** @hidden */
    addToArray(value: any, focusOnInput = true): void {
        const index = this.selected.findIndex((selectvalue) => equal(selectvalue, value));
        if (index === -1) {
            this.selected.push(value);
        } else {
            this.selected.splice(index, 1);
        }
        if (!this.mobile && focusOnInput) {
            this.close();
        }
        this._updateModel(this.selected);
        if (focusOnInput) {
            this.searchInputElement.nativeElement.focus();
        }
        this.emitChangeEvent(value ? this.selected : null);
        this.detectChanges();
    }

    /** @hidden */
    addOnButtonClick(event: Event): void {
        if (isFunction(this.addOnButtonClickFn)) {
            this.addOnButtonClickFn();
            return;
        }
        if (!this.openDropdownOnAddOnClicked && this.isOpen) {
            this.showList(false);
        } else if (this.openDropdownOnAddOnClicked) {
            this.showList(!this.isOpen);
            this.searchInputElement?.nativeElement.focus();
        }

        this.addOnButtonClicked.emit(event);
    }

    /** @hidden */
    onInputGroupClicked(): void {
        if (this.mobile && !this.isOpen) {
            this.open();
        }
    }

    /** @hidden */
    moreClicked(): void {
        this.open();
        this._suggestions = this.selected;
        this.markForCheck();
    }

    /** @hidden */
    deleteToken(selectedValue: MultiInputOption): void {
        if (this.tokenizer.tokenList.length > 0) {
            this.tokenizer.tokenList.forEach((token) => {
                if (token.tokenWrapperElement.nativeElement.textContent === selectedValue.label) {
                    this.selected.splice(this.selected.indexOf(selectedValue), 1);
                }
            });
        }
        this._updateModel(this.selected);
        this.searchInputElement.nativeElement.focus();
        this.close();
        this.markForCheck();
    }

    /** @hidden */
    removeToken(token: any): void {
        this.selected.splice(this.selected.indexOf(token), 1);
        this.emitChangeEvent(token ? this.selected : null);
        this.searchInputElement.nativeElement.focus();
        if (this.selected.length === 0) {
            this._selected = [];
        }
        this._updateModel(this.selected);
        this.markForCheck();
    }

    /** @hidden */
    removeSelectedTokens(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            if (this.isOpen) {
                this.listComponent._setCurrentActiveItemIndex(0);
                this.listTemplateDD.listItems.first.focus();
            } else {
                this.showList(!this.isOpen);
                this.searchInputElement.nativeElement.focus();
            }
        }
        this.markForCheck();
    }

    /** @hidden Define is selected item selected */
    isSelectedOptionItem(selectedItem: any): boolean {
        return (
            (this.lookupKey && this.lookupValue(this.selected) === this.lookupValue(selectedItem)) ||
            this.displayValue(this.selected) === this.displayValue(selectedItem)
        );
    }

    /** @hidden Method to set selected item */
    selectOptionItem(item: MultiInputOption): void {
        if (this.mobile) {
            this.selectedValue = item;
            this.inputText = item.label;
            this.detectChanges();

            return;
        }

        this.inputText = item.label;
        this._checkAndUpdate(item);
        this.showList(false);
    }

    /** @hidden Method to set as selected */
    setAsSelected(item: MultiInputOption[]): void {
        this._selected = item;
        this.inputText = '';
        this._markListItemsAsSelected();
    }

    /**
     * @hidden
     * Mathod for marking items in dropdown as selected.
     */
    _markListItemsAsSelected(): void {
        this._listItems?.forEach((listItem) => {
            const isSelected = !!this._selected.find((value) => equal(value.value, listItem.value));
            listItem.setSelected(isSelected);
        });
    }

    /** @hidden */
    _onAutoComplete(event: AutoCompleteEvent): void {
        if (!event.forceClose || !this._suggestions) {
            return;
        }

        const [item] = this.isGroup ? this._suggestions[0]?.children || [] : this._suggestions;
        if (item && item.label === event.term) {
            this.addToArray(item);
        }
    }

    /** @hidden */
    _onKeydownEnter(event: Event): void {
        if (this.inputText) {
            event.preventDefault();
        }
    }

    /** @hidden Handle dialog dismissing, closes popover and sets backup data. */
    _dialogDismiss(selected: any[]): void {
        this._selected = selected;
        this.showList(false);
    }

    /** @hidden Handle dialog approval, closes popover and propagates data changes. */
    _dialogApprove(): void {
        this.onChange(this.selected);
        this._updateModel(this.selected);
        this.showList(false);
    }

    /** @hidden if not selected update model */
    private _checkAndUpdate(modelValue: MultiInputOption): void {
        if (this.isSelectedOptionItem(modelValue)) {
            return;
        }

        const optionItem = this._getSelectedOptionItem(this.inputText);

        this._updateModel(optionItem ? optionItem.value : this.inputText);
    }

    /** @hidden */
    private _getSelectedOptionItem(text: string): MultiInputOption | undefined {
        if (!this.isGroup) {
            return this._suggestions.find((item) => item.label === text);
        }

        return this._suggestions
            .reduce((result: MultiInputOption[], item: MultiInputOption) => {
                item.children && result.push(...item.children);

                return result;
            }, [])
            .find((item) => item.label === text);
    }

    /** @hidden Update model */
    private _updateModel(value: any): void {
        // setting value, it will call setValue()
        this.value = value;
    }

    /** @hidden */
    private async _setUpMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: MULTIINPUT_COMPONENT, useValue: this }],
            parent: this._injector
        });

        this._dynamicComponentService.createDynamicComponent(
            { listTemplate: this.listTemplate, controlTemplate: this.controlTemplate },
            PlatformMultiInputMobileComponent,
            {
                containerRef: this._viewContainerRef
            },
            { injector }
        );
    }
}

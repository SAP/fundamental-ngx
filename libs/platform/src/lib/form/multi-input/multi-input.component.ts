import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Host,
    Inject,
    Injector,
    Input,
    OnInit,
    Optional,
    Self,
    SkipSelf,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { DOWN_ARROW, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';

import { TokenizerComponent } from '@fundamental-ngx/core/token';
import { DynamicComponentService, KeyUtil } from '@fundamental-ngx/core/utils';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import {
    DATA_PROVIDERS,
    DataProvider,
    FormField,
    FormFieldControl,
    MultiInputDataSource,
    MultiInputOption,
    isFunction
} from '@fundamental-ngx/platform/shared';
import { ListComponent, SelectionType } from '@fundamental-ngx/platform/list';

import { InputType } from '../input/input.component';
import { AutoCompleteEvent } from '../auto-complete/auto-complete.directive';
import { BaseMultiInput, MultiInputSelectionChangeEvent } from './base-multi-input';
import { PlatformMultiInputMobileComponent } from './multi-input-mobile/multi-input-mobile.component';
import { PlatformMultiInputMobileModule } from './multi-input-mobile/multi-input-mobile.module';
import { MULTIINPUT_COMPONENT } from './multi-input.interface';
import { MultiInputConfig } from './multi-input.config';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';
let uniqueHiddenLabel = 0;

@Component({
    selector: 'fdp-multi-input',
    templateUrl: './multi-input.component.html',
    styleUrls: ['./multi-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FormFieldControl,
            useExisting: forwardRef(() => PlatformMultiInputComponent),
            multi: true
        }
    ]
})
export class PlatformMultiInputComponent extends BaseMultiInput implements OnInit, AfterViewInit {
    protected tokenCountHiddenLabel = `fdp-multi-input-token-count-id-${uniqueHiddenLabel++}`;

    /** token  count hidden label */
    @Input()
    tokenHiddenId: string = this.tokenCountHiddenLabel;

    /** type Represent the type of input used for the multi Input */
    @Input()
    type: InputType;

    /** boolean type represents the focus set for the respective multi input */
    @Input()
    autofocus = false;

    @ViewChild(ListComponent)
    listTemplateDD: ListComponent<MultiInputOption>;

    /** Selected values from the list items. */
    _selected: any[] = [];

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

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
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

    /** @hidden */
    @ViewChild(TokenizerComponent)
    tokenizer: TokenizerComponent;

    /** @hidden */
    @ViewChild('controlTemplate')
    controlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    listTemplate: TemplateRef<any>;

    constructor(
        /** @hidden */
        readonly cd: ChangeDetectorRef,
        /** @hidden */
        readonly elementRef: ElementRef,
        /** @hidden */
        @Optional() @Self() readonly ngControl: NgControl,
        /** @hidden */
        @Optional() @Self() readonly ngForm: NgForm,
        /** @hidden */
        @Optional() readonly dialogConfig: DialogConfig,
        /** @hidden */
        readonly _dynamicComponentService: DynamicComponentService,
        /** @hidden */
        private readonly _viewContainerRef: ViewContainerRef,
        /** @hidden */
        private readonly _injector: Injector,
        /** @hidden */
        @Optional() @Inject(DATA_PROVIDERS) private _providers: Map<string, DataProvider<any>>,
        /** @hidden */
        readonly _multiInputConfig: MultiInputConfig,
        /** @hidden */
        @Optional() @SkipSelf() @Host() formField: FormField,
        /** @hidden */
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, elementRef, ngControl, ngForm, dialogConfig, _multiInputConfig, formField, formControl);
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

        const providers = this._providers?.size === 0 ? this._multiInputConfig.providers : this._providers;
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

        if (this.autofocus) {
            this.searchInputElement.nativeElement.focus();
        }
    }

    /** @hidden Method to emit change event */
    emitChangeEvent<T>(modelValue: T): void {
        const event = new MultiInputSelectionChangeEvent(this, modelValue);

        this.selectionChange.emit(event);
    }

    /** @hidden */
    addToArray(value: any): void {
        const index = this.selected.findIndex((selectvalue) => selectvalue.label === value.label);
        if (index === -1) {
            this.selected.push(value);
            if (!this.mobile) {
                this.close();
            }
        }
        this._updateModel(this.selected);
        this.searchInputElement.nativeElement.focus();
        this.emitChangeEvent(value ? this.selected : null);
        this._cd.detectChanges();
    }

    /** @hidden */
    addOnButtonClick(): void {
        if (isFunction(this.addOnButtonClickFn)) {
            this.addOnButtonClickFn();
            return;
        }

        this.showList(!this.isOpen);
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
        this._cd.markForCheck();
    }

    /** @hidden */
    deleteToken(selectedValue: MultiInputOption): void {
        if (this.tokenizer.tokenList.length > 0) {
            this.tokenizer.tokenList.forEach((token) => {
                if (token.tokenWrapperElement.nativeElement.innerText === selectedValue.label) {
                    this.selected.splice(this.selected.indexOf(selectedValue), 1);
                }
            });
        }
        this._updateModel(this.selected);
        this.searchInputElement.nativeElement.focus();
        this.close();
        this._cd.markForCheck();
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
        this._cd.markForCheck();
    }

    /** @hidden */
    removeSelectedTokens(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            if (this.isOpen) {
                this.listTemplateDD.listItems.first.focus();
            } else {
                this.showList(!this.isOpen);
                this.searchInputElement.nativeElement.focus();
            }
        }
        if (KeyUtil.isKeyCode(event, [ESCAPE])) {
            this.showList(false);
        }
        this._cd.markForCheck();
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
            this.cd.detectChanges();

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
    }

    /** @hidden */
    _onAutoComplete(event: AutoCompleteEvent): void {
        if (!event.forceClose) {
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

        await this._dynamicComponentService.createDynamicModule(
            { listTemplate: this.listTemplate, controlTemplate: this.controlTemplate },
            PlatformMultiInputMobileModule,
            PlatformMultiInputMobileComponent,
            this._viewContainerRef,
            injector
        );
    }
}

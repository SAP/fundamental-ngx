import { Direction } from '@angular/cdk/bidi';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    ViewChild,
    forwardRef,
    Input,
    OnInit,
    AfterViewInit,
    ChangeDetectorRef,
    ElementRef,
    Host,
    Inject,
    Optional,
    Self,
    SkipSelf,
    Injector,
    TemplateRef
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { TokenizerComponent, KeyUtil, DialogConfig, DynamicComponentService, RtlService } from '@fundamental-ngx/core';

import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DATA_PROVIDERS, DataProvider, ListDataSource } from '../../../domain/data-source';
import { MultiInputOption } from '../../../domain/data-model';
import { ListComponent, SelectionType } from '../../list/list.component';
import { ListConfig } from '../../list/list.config';
import { FormFieldControl, Status } from '../form-control';
import { FormField } from '../form-field';

import { InputType } from '../input/input.component';
import { BaseMultiInput, MultiInputSelectionChangeEvent } from './base-multi-input';
import { PlatformMultiInputMobileComponent } from './multi-input-mobile/multi-input-mobile.component';
import { MULTIINPUT_COMPONENT } from './multi-input.interface';
import { AutoCompleteEvent } from '../auto-complete/auto-complete.directive';

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
    /** type Represent the type of input used for the multi Input */
    @Input()
    type: InputType;

    /**boolean type represents the focus set for the respective multi input */
    @Input()
    autofocus = false;

    @ViewChild(ListComponent)
    listTemplateDD: ListComponent;

    /** Selected values from the list items. */
    @Input()
    selected: any[] = [];

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
    /** @hidden
     * Whether the input is disabled. */
    protected _disabled = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }

    @Input()
    get status(): Status {
        return this._state;
    }
    set status(value: Status) {
        this._state = value;
    }

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
    @ViewChild(CdkConnectedOverlay)
    _connectedOverlay: CdkConnectedOverlay;

    /** @hidden */
    public updateSelectedListVariables = [];
    /** @hidden */
    private _dataSourceSubscription = Subscription.EMPTY;

    /** @hidden */
    private _direction: Direction = 'ltr';

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
        @Optional() @Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
        /** @hidden */
        readonly _listConfig: ListConfig,
        /** @hidden */
        @Optional() private _rtlService: RtlService,
        /** @hidden */
        @Optional() @SkipSelf() @Host() formField: FormField,
        /** @hidden */
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, elementRef, ngControl, ngForm, dialogConfig, _listConfig, formField, formControl);
    }

    /** @hidden */
    ngOnInit(): void {
        const providers = this.providers?.size === 0 ? this._listConfig.providers : this.providers;
        // if we have both prefer dataSource
        if (!this.dataSource && this.entityClass && providers.has(this.entityClass)) {
            this.dataSource = new ListDataSource(providers.get(this.entityClass));
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._rtlService?.rtl
            .pipe(takeUntil(this._destroyed))
            .subscribe((isRtl) => (this._direction = isRtl ? 'rtl' : 'ltr'));

        if (this._connectedOverlay) {
            this._connectedOverlay.attach
                .pipe(takeUntil(this._destroyed))
                .subscribe(() => this._connectedOverlay.overlayRef.setDirection(this._direction));
        }
        if (this.mobile) {
            this._setUpMobileMode();
        }
        if (this.autofocus) {
            console.log('autofocus value', this.autofocus);
            this.searchInputElement.nativeElement.focus();
            console.log('autofocus value', this.autofocus);
        }
    }

    /** @hidden
     * Method to emit change event
     */
    emitChangeEvent<T>(modelValue: T): void {
        const event = new MultiInputSelectionChangeEvent(this, modelValue);

        this.selectionChange.emit(event);
    }

    /** @hidden */
    addToArray(value: any): void {
        const index = this.selected.findIndex((selectvalue) => selectvalue.label === value.label);
        if (index === -1) {
            this.selected.push(value);
            this.close();
        }
        this._updateModel(this.selected);
        this.emitChangeEvent(value ? this.selected : null);
        this._cd.detectChanges();
    }

    /** @hidden
     * Control Value Accessor
     */
    writeValue(value: any[]): void {
        if (value) {
            super.writeValue(value);
        }
        this._cd.markForCheck();
    }

    /** @hidden */
    addOnButtonClick(): void {
        this.searchTermChanged('');
        this.selectionMode = 'none';
        this.showList(!this.isOpen);
    }

    /** @hidden */
    moreClicked(): void {
        this.open();
        this._suggestions = this.selected;
        this.selectionMode = 'delete';
        this._cd.markForCheck();
    }
    /** @hidden */
    deleteToken(selectedValue): void {
        if (this.tokenizer.tokenList.length > 0) {
            this.tokenizer.tokenList.forEach((token) => {
                if (token.tokenWrapperElement.nativeElement.innerText === selectedValue.label) {
                    this.selected.splice(this.selected.indexOf(selectedValue), 1);
                }
            });
        }
        this.close();
        if (this.selected.length < 10) {
            this.selectionMode = 'none';
        }
        this._cd.markForCheck();
    }
    /** @hidden */
    removeToken(token): void {
        this.selected.splice(this.selected.indexOf(token), 1);
        this.emitChangeEvent(token ? this.selected : null);
        this.searchInputElement.nativeElement.focus();
        this._updateModel(this.selected);
    }

    /** @hidden */
    removeSelectedTokens(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            this.listTemplateDD.listItems.first.focus();
        }
        if (KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            this.tokenizer.focusTokenElement(this.tokenizer.tokenList.length - 1);
        }
    }
    /** @hidden
     * Define is selected item selected
     */
    isSelectedOptionItem(selectedItem: any): boolean {
        return (
            (this.lookupKey && this.lookupValue(this.selected) === this.lookupValue(selectedItem)) ||
            this.displayValue(this.selected) === this.displayValue(selectedItem)
        );
    }

    /** @hidden
     * Method to set selected item
     */
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

    /** @hidden
     * Method to set as selected
     */
    setAsSelected(item: MultiInputOption[]): void {
        const selectedItem = item[0];

        if (this.isSelectedOptionItem(selectedItem)) {
            return;
        }

        this.selectedValue = this.isGroup
            ? selectedItem.children
                ? selectedItem.children[0]
                : selectedItem
            : selectedItem;
        this.inputText = this.displayValue(this.selected);
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
    _onKeydownEnter(event: KeyboardEvent): void {
        if (this.inputText) {
            event.preventDefault();
        }
    }

    /** @hidden
     * if not selected update model
     */
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
                result.push(...item.children);

                return result;
            }, [])
            .find((item) => item.label === text);
    }

    /** @hidden
     * Update model
     */
    private _updateModel(value: any): void {
        // setting value, it will call setValue()
        this.value = value;
    }

    /** @hidden */
    private _setUpMobileMode(): void {
        this._dynamicComponentService.createDynamicComponent(
            { listTemplate: this.listTemplate, controlTemplate: this.controlTemplate },
            PlatformMultiInputMobileComponent,
            { container: this.elementRef.nativeElement },
            { injector: Injector.create({ providers: [{ provide: MULTIINPUT_COMPONENT, useValue: this }] }) }
        );
    }
    /** @hidden Handle dialog dismissing, closes popover and sets backup data. */
    dialogDismiss(term: string): void {
        if (this.selectedValue && term !== this.selectedValue.label) {
            this.selectedValue = this._getSelectedOptionItem(term);
        }
        this.selected = [];
        this.inputText = term;
        this.showList(false);
    }

    /** @hidden Handle dialog approval, closes popover and propagates data changes. */
    dialogApprove(): void {
        if (this.selected && this.selectedValue.label === this.inputText) {
            this._updateModel(this.selectedValue.value);
        } else {
            const optionItem = this._getSelectedOptionItem(this.inputText);

            this._updateModel(optionItem ? optionItem.value : this.inputText);
        }

        this.showList(false);
    }
}

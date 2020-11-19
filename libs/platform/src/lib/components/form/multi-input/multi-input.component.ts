import { Direction } from '@angular/cdk/bidi';
import { BACKSPACE, DELETE, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    ViewChild,
    EventEmitter,
    forwardRef,
    Input,
    Output,
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

import {
    TokenizerComponent,
    KeyUtil,
    DialogConfig,
    DIALOG_CONFIG,
    DynamicComponentService,
    RtlService
} from '@fundamental-ngx/core';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DATA_PROVIDERS, DataProvider, ListDataSource } from '../../../domain';
import { MultiInputOption } from '../../../domain/data-model';
import { ListComponent, SelectionType } from '../../list/list.component';
import { ListConfig } from '../../list/public_api';

import { FormFieldControl } from '../form-control';
import { FormField } from '../form-field';
import { InputType } from '../input/input.component';
import { BaseMultiInput, MultiInputSelectionChangeEvent } from './base-multi-input';
import { PlatformMultiInputMobileComponent } from './multi-input-mobile/multi-input-mobile.component';
import { MULTIINPUT_COMPONENT } from './multi-input.interface';

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

    @ViewChild('listTemplateDD')
    listTemplateDD: ListComponent;

    /** Selected values from the list items. */
    @Input()
    selected: any[] = [];

    /**
     *
     */
    @Input()
    selectionMode: SelectionType = 'none';

    /** @hidden */
    selectedValue?: MultiInputOption;

    /** @hidden */
    get isGroup(): boolean {
        return !!(this.group && this.groupKey);
    }
    /** Whether the input is disabled. */
    protected _disabled = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }

    /** Represents the  value injected from the selected list value*/
    @Input()
    set selectedListVariable(selectedValue) {
        this._selectedListVariable = selectedValue;
        if (this._selectedListVariable) {
            this.addToArray(this._selectedListVariable);
        }
    }
    get selectedListVariable(): any {
        return this._selectedListVariable;
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

    /** @hidden Emits event when the menu is opened/closed */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    public updateSelectedListVariables = [];
    private _dataSourceSubscription = Subscription.EMPTY;

    /**
     * Whether the popover is opened.
     */
    isOpen = false;

    /** @hidden */
    private _direction: Direction = 'ltr';

    private _selectedListVariable: any;

    constructor(
        readonly cd: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @Self() readonly ngForm: NgForm,
        @Optional() @Inject(DIALOG_CONFIG) readonly dialogConfig: DialogConfig,
        readonly _dynamicComponentService: DynamicComponentService,
        @Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
        readonly _listConfig: ListConfig,
        private _rtlService: RtlService,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, elementRef, ngControl, ngForm, dialogConfig, _listConfig, formField, formControl);
    }

    /** @hidden */
    ngOnInit(): void {
        const providers = this.providers.size === 0 ? this._listConfig.providers : this.providers;
        // if we have both prefer dataSource
        if (!this.dataSource && this.entityClass && providers.has(this.entityClass)) {
            this.dataSource = new ListDataSource(providers.get(this.entityClass));
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._rtlService.rtl
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
    }

    addToArray($select: any): void {
        this.selected.push($select);
        this.popoverOpenChangeHandle(this.isOpen);
    }

    removeToken(token): void {
        this.selected.splice(this.selected.indexOf(token), 1);
    }

    /** @hidden */
    popoverOpenChangeHandle(isOpen: boolean): void {
        this.isOpen ? this.open() : this.close();
    }

    /** Opens the select popover body. */
    open(): void {
        this.isOpen = false;
        this.isOpenChange.emit(this.isOpen);
        this._cd.markForCheck();
    }
    /** Closes the select popover body. */
    close(): void {
        this.isOpen = true;
        this.isOpenChange.emit(this.isOpen);
        this._cd.markForCheck();
    }
    /** @hidden */
    removeSelectedTokens(event: KeyboardEvent): void {
        let allSelected = true;
        if (KeyUtil.isKeyCode(event, [DELETE, BACKSPACE])) {
            this.tokenizer.tokenList.forEach((token) => {
                if (token.selected || token.tokenWrapperElement.nativeElement === document.activeElement) {
                    this.removeToken(token.elementRef.nativeElement.innerText);
                } else {
                    allSelected = false;
                }
            });
        }
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            this.listTemplateDD.listItems.first.focus();
        }
        if (KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            this.tokenizer.focusTokenElement(this.tokenizer.tokenList.length - 1);
        }
    }
    /** @hidden
     * Method to emit change event
     */
    emitChangeEvent<T>(modelValue: T): void {
        const event = new MultiInputSelectionChangeEvent(this, modelValue);

        this.selectionChange.emit(event);
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

        this.emitChangeEvent(value ? value : null);
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
    /** Handle dialog dismissing, closes popover and sets backup data. */
    dialogDismiss(term: string): void {
        if (this.selectedValue && term !== this.selectedValue.label) {
            this.selectedValue = this._getSelectedOptionItem(term);
        }

        this.inputText = term;
        this.showList(false);
    }

    /** Handle dialog approval, closes popover and propagates data changes. */
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

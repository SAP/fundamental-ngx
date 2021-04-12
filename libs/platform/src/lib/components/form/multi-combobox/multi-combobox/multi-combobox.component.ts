import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
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
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { A, DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Direction } from '@angular/cdk/bidi';
import { takeUntil } from 'rxjs/operators';

import {
    closestElement,
    DialogConfig,
    DynamicComponentService,
    KeyUtil,
    RtlService,
    TokenizerComponent
} from '@fundamental-ngx/core';
import { DATA_PROVIDERS, DataProvider, ListDataSource } from '../../../../domain/data-source';
import { FormFieldControl } from '../../form-control';
import { BaseMultiCombobox, MultiComboboxSelectionChangeEvent } from '../commons/base-multi-combobox';
import { OptionItem, SelectableOptionItem } from '../../../../domain';
import { MultiComboboxMobileComponent } from '../multi-combobox-mobile/multi-combobox/multi-combobox-mobile.component';
import { MULTICOMBOBOX_COMPONENT } from '../multi-combobox.interface';
import { FormField } from '../../form-field';
import { ComboboxConfig } from '../../combobox/combobox.config';

@Component({
    selector: 'fdp-multi-combobox',
    templateUrl: './multi-combobox.component.html',
    styleUrls: ['./multi-combobox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: MultiComboboxComponent, multi: true }]
})
export class MultiComboboxComponent extends BaseMultiCombobox implements OnInit, AfterViewInit {
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }

    /** @hidden */
    @ViewChild('controlTemplate')
    controlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('mobileControlTemplate')
    mobileControlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    listTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild(TokenizerComponent)
    tokenizer: TokenizerComponent;

    /** @hidden */
    @ViewChild(CdkConnectedOverlay)
    _connectedOverlay: CdkConnectedOverlay;

    /** @hidden
     * List of selected suggestions
     * */
    _selected: SelectableOptionItem[] = [];

    /** @hidden */
    private _direction: Direction = 'ltr';

    constructor(
        readonly cd: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @Self() readonly ngForm: NgForm,
        @Optional() readonly dialogConfig: DialogConfig,
        readonly _dynamicComponentService: DynamicComponentService,
        @Optional() @Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
        readonly _comboboxConfig: ComboboxConfig,
        private _rtlService: RtlService,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, elementRef, ngControl, ngForm, dialogConfig, _comboboxConfig, formField, formControl);
    }

    /** @hidden */
    ngOnInit(): void {
        const providers = this.providers?.size === 0 ? this._comboboxConfig.providers : this.providers;
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
            .subscribe(isRtl => (this._direction = isRtl ? 'rtl' : 'ltr'));

        if (this._connectedOverlay) {
            this._connectedOverlay.attach
                .pipe(takeUntil(this._destroyed))
                .subscribe(() => this._connectedOverlay.overlayRef.setDirection(this._direction));
        }

        if (this.mobile) {
            this._setUpMobileMode();
        }

        this._setSelectedItems();
    }

    /** @hidden
     * Method to emit change event
     */
    emitChangeEvent<T>(value: T): void {
        const event = new MultiComboboxSelectionChangeEvent(this, value);

        this.selectionChange.emit(event);
    }

    /** @hidden */
    toggleSelection(item: SelectableOptionItem): void {
        const idx = this._getTokenIndexByLabelOrValue(item);

        if (idx === -1) {
            this._selected.push(item);
        } else {
            this._selected.splice(idx, 1);
        }

        item.selected = !item.selected;

        this._propagateChange()
    }

    /** @hidden */
    toggleSelectionByInputText(): void {
        const item = this._getSelectItemByInputValue(this.inputText);
        if (item) {
            this.toggleSelection(item);
            this.inputText = '';
        }
    }

    /** @hidden
     *  Method that selects all possible options.
     *  *select* attribute – if *true* select all, if *false* unselect all
     * */
    handleSelectAllItems(select: boolean): void {
        this._flatSuggestions.forEach(item => (item.selected = select));
        this._selected = select ? [...this._flatSuggestions] : [];

        this._propagateChange();
    }

    /** @hidden */
    navigateByTokens(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW]) && this.isOpen) {
            this.listComponent.items.first.focus();
        }
        if (KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            this.tokenizer.focusTokenElement(this.tokenizer.tokenList.length - 1);
        }
    }

    /** @hidden */
    removeToken(token: SelectableOptionItem, event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }

        const idx = this._getTokenIndexByLabelOrValue(token);
        this._selected.splice(idx, 1);
        token.selected = false;

        this._propagateChange(true);
    }

    /** @hidden */
    moreClicked(): void {
        this._suggestions = this.isGroup
            ? this._convertObjectsToGroupOptionItems(this._selected.map(({ value }) => value))
            : [...this._selected];

        this.showList(true);
        this.selectedShown$.next(true);
        this._cd.markForCheck();
    }

    /** @hidden */
    onBlur(event: FocusEvent): void {
        const target = event.relatedTarget as HTMLElement;
        if (target) {
            const isList = !!closestElement('.fdp-multi-combobox__list-container', target);
            if (isList) {
                return;
            }
            this.inputText = '';
        }
    }

    /** @hidden
     * Method to set input text as item label.
     */
    setInputTextFromOptionItem(item: OptionItem): void {
        if (this.mobile) {
            this.inputText = item.label;
            this.cd.detectChanges();

            return;
        }

        this.inputText = item.label;
        this.showList(false);
    }

    /** @hidden */
    onInputKeyupHandler(): void {
        if (this.inputText && (!this._suggestions || !this._suggestions.length)) {
            this.inputText = this.inputText.slice(0, -1);

            this.isSearchInvalid = true;
            this.state = 'error';

            this.searchTermChanged();
        } else {
            this.isSearchInvalid = false;
            this.state = 'default';
        }
    }

    /** @hidden */
    onItemKeyDownHandler(event: KeyboardEvent, item: SelectableOptionItem): void {
        // unselect all
        if ((event.ctrlKey || event.metaKey) && event.shiftKey && KeyUtil.isKeyCode(event, A)) {
            event.preventDefault();
            this.handleSelectAllItems(false);
            return;
        }

        // select all
        if ((event.ctrlKey || event.metaKey) && KeyUtil.isKeyCode(event, A)) {
            event.preventDefault();
            this.handleSelectAllItems(true);
            return;
        }

        if (!KeyUtil.isKeyCode(event, ENTER) && !KeyUtil.isKeyCode(event, SPACE)) {
            return;
        }

        if (KeyUtil.isKeyCode(event, ENTER) && !this.mobile) {
            this.close();

            return;
        }
    }

    /** @hidden Handle dialog dismissing, closes popover and sets backup data. */
    dialogDismiss(backup: SelectableOptionItem[]): void {
        this._selected = [...backup];
        this.inputText = '';
        this.showList(false);
        this.selectedShown$.next(false);
    }

    /** @hidden Handle dialog approval, closes popover and propagates data changes. */
    dialogApprove(): void {
        this._propagateChange(true);
        this.inputText = '';
        this.showList(false);
    }

    /** @hidden */
    private _getTokenIndexByLabelOrValue(item: SelectableOptionItem): number {
        return this._selected.findIndex(token => (token.label === item.label) || (token.value === item.value));
    }

    /** @hidden */
    private _setSelectedItems(): void {
        if (!this.selectedItems?.length) {
            return;
        }

        for (let i = 0; i <= this.selectedItems.length; i++) {
            const selectedItem = this.selectedItems[i];
            const idx = this._flatSuggestions.findIndex(item => (item.label === selectedItem) || (item.value === selectedItem));
            if (idx !== -1) {
                this._selected.push(this._flatSuggestions[idx]);
                this._flatSuggestions[idx].selected = true;
            }
        }


        this.cd.detectChanges();
    }

    /** @hidden */
    private _mapAndUpdateModel(): void {
        const selectedItems = this._selected.map(({ value }) => value);

        // setting value, it will call setValue()
        this.value = selectedItems;

        this.emitChangeEvent(selectedItems || null);
    }

    /** @hidden */
    private _propagateChange(emitInMobile?: boolean): void {
        if (!this.mobile || emitInMobile) {
            this.onChange(this._selected);
            this._mapAndUpdateModel();
        }
    }

    /** @hidden */
    private _setUpMobileMode(): void {
        this._dynamicComponentService.createDynamicComponent(
            { listTemplate: this.listTemplate, controlTemplate: this.mobileControlTemplate },
            MultiComboboxMobileComponent,
            { container: this.elementRef.nativeElement },
            { injector: Injector.create({ providers: [{ provide: MULTICOMBOBOX_COMPONENT, useValue: this }] }) }
        );
    }
}

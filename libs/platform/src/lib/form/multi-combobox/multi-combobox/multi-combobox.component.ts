import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Host,
    Inject,
    Injector,
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
import { A, DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { of } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import equal from 'fast-deep-equal';

import { DynamicComponentService, KeyUtil } from '@fundamental-ngx/core/utils';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import {
    DATA_PROVIDERS,
    DataProvider,
    FormField,
    FormFieldControl,
    MultiComboBoxDataSource,
    OptionItem,
    SelectableOptionItem
} from '@fundamental-ngx/platform/shared';

import { BaseMultiCombobox } from '../commons/base-multi-combobox';
import { MultiComboboxMobileComponent } from '../multi-combobox-mobile/multi-combobox/multi-combobox-mobile.component';
import { PlatformMultiComboboxMobileModule } from '../multi-combobox-mobile/multi-combobox-mobile.module';
import { MULTICOMBOBOX_COMPONENT } from '../multi-combobox.interface';
import { MultiComboboxConfig } from '../multi-combobox.config';
import { AutoCompleteEvent } from '../../auto-complete/auto-complete.directive';

@Component({
    selector: 'fdp-multi-combobox',
    templateUrl: './multi-combobox.component.html',
    styleUrls: ['./multi-combobox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: MultiComboboxComponent, multi: true }]
})
export class MultiComboboxComponent extends BaseMultiCombobox implements OnInit, AfterViewInit {
    /** @hidden */
    @ViewChild('mobileControlTemplate')
    mobileControlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    listTemplate: TemplateRef<any>;

    /**
     * @hidden
     * List of selected suggestions
     */
    _selectedSuggestions: SelectableOptionItem[] = [];

    constructor(
        readonly cd: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @SkipSelf() readonly ngForm: NgForm,
        @Optional() readonly dialogConfig: DialogConfig,
        readonly _dynamicComponentService: DynamicComponentService,
        @Optional() @Inject(DATA_PROVIDERS) private _providers: Map<string, DataProvider<any>>,
        readonly _multiComboboxConfig: MultiComboboxConfig,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, elementRef, ngControl, ngForm, dialogConfig, _multiComboboxConfig, formField, formControl);
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();

        const providers = this._providers?.size === 0 ? this._multiComboboxConfig.providers : this._providers;
        // if we have both prefer dataSource
        if (!this.dataSource && this.entityClass && providers.has(this.entityClass)) {
            this.dataSource = new MultiComboBoxDataSource(providers.get(this.entityClass));
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        if (this.mobile) {
            this._setUpMobileMode();
        }

        this._setSelectedSuggestions();
    }

    /** @hidden */
    toggleSelection(item: SelectableOptionItem): void {
        const idx = this._getTokenIndexByLabelOrValue(item);

        if (idx === -1) {
            this._selectedSuggestions.push(item);
        } else {
            this._selectedSuggestions.splice(idx, 1);
        }

        item.selected = !item.selected;

        this._propagateChange();
    }

    /** @hidden */
    onOptionCheckboxClicked(event: Event): void {
        event.stopPropagation();
    }

    /** @hidden */
    onCompleteTerm(event: AutoCompleteEvent): void {
        if (event.forceClose) {
            this.toggleSelectionByInputText(event.term);
            this.close();
        }
    }

    /** @hidden */
    toggleSelectionByInputText(text = this.inputText): void {
        const item = this._getSelectItemByInputValue(text);
        if (item) {
            this.toggleSelection(item);
            this.inputText = '';
        }
    }

    /**
     * @hidden
     * Method that selects all possible options.
     * *select* attribute – if *true* select all, if *false* unselect all
     * */
    handleSelectAllItems(select: boolean): void {
        this._flatSuggestions.forEach((item) => (item.selected = select));
        this._selectedSuggestions = select ? [...this._flatSuggestions] : [];

        this._propagateChange();
    }

    /** @hidden */
    navigateByTokens(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW]) && this.isOpen) {
            this.listComponent.items?.first.focus();
        }
    }

    /** @hidden */
    removeToken(token: SelectableOptionItem, event?: MouseEvent): void {
        if (event) {
            event.preventDefault();
        }

        // NOTE: needs to prevent ExpressionChangedAfterItHasBeenCheckedError
        of(true)
            .pipe(takeUntil(this._destroyed), delay(1))
            .subscribe(() => {
                const idx = this._getTokenIndexByLabelOrValue(token);
                this._selectedSuggestions.splice(idx, 1);
                token.selected = false;

                this._propagateChange(true);

                if (!this._selectedSuggestions.length) {
                    this._focusToSearchField();
                }
            });
    }

    /** @hidden */
    moreClicked(): void {
        this._suggestions = this.isGroup
            ? this._convertObjectsToGroupOptionItems(this._selectedSuggestions.map(({ value }) => value))
            : this._suggestions.filter((value) =>
                  this._selectedSuggestions.some((item) => equal(item.value, value.value))
              );

        this.showList(true);
        this.selectedShown$.next(true);
        this.cd.markForCheck();
    }

    /** @hidden */
    onBlur(event: FocusEvent): void {
        const target = event.relatedTarget as HTMLElement;
        if (target) {
            const isList = !!target.closest('.fdp-multi-combobox__list-container');
            if (isList) {
                return;
            }
            this.showList(false);
            this.inputText = '';
        }
    }

    /**
     * @hidden
     * Method to set input text as item label.
     */
    setInputTextFromOptionItem(item: OptionItem): void {
        this.inputText = item.label;

        if (this.mobile) {
            return;
        }

        this.showList(false);
    }

    /** @hidden */
    onItemKeyDownHandler(event: KeyboardEvent, index = 0): void {
        if (KeyUtil.isKeyCode(event, ESCAPE)) {
            this._focusToSearchField();
            this.close();
        } else if (event.shiftKey && KeyUtil.isKeyCode(event, TAB)) {
            event.preventDefault();
            this.listComponent?.setItemActive(index - 1);
        } else if (KeyUtil.isKeyCode(event, TAB)) {
            event.preventDefault();
            this.listComponent?.setItemActive(index + 1);
        } else if ((event.ctrlKey || event.metaKey) && event.shiftKey && KeyUtil.isKeyCode(event, A)) {
            event.preventDefault();
            this.handleSelectAllItems(false);
        } else if ((event.ctrlKey || event.metaKey) && KeyUtil.isKeyCode(event, A)) {
            event.preventDefault();
            this.handleSelectAllItems(true);
        } else if (!KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            return;
        } else if (KeyUtil.isKeyCode(event, ENTER) && !this.mobile) {
            this.close();
        }
    }

    /** @hidden Handle dialog dismissing, closes popover and sets backup data. */
    dialogDismiss(backup: SelectableOptionItem[]): void {
        this._selectedSuggestions = [...backup];
        this.inputText = '';
        this.showList(false);
        this.selectedShown$.next(false);
    }

    /** @hidden Handle dialog approval, closes popover and propagates data changes. */
    dialogApprove(): void {
        this.inputText = '';
        this.showList(false);
        this._propagateChange(true);
    }

    /** @hidden */
    private _getTokenIndexByLabelOrValue(item: SelectableOptionItem): number {
        return this._selectedSuggestions.findIndex(
            (token) => token.label === item.label || equal(token.value, item.value)
        );
    }

    /** @hidden */
    private _mapAndUpdateModel(): void {
        const selectedItems = this._selectedSuggestions.map(({ value }) => value);

        // setting value, it will call setValue()
        this.value = selectedItems;

        this._emitChangeEvent();
    }

    /** @hidden */
    private _propagateChange(emitInMobile?: boolean): void {
        if (!this.mobile || emitInMobile) {
            this.onChange(this._selectedSuggestions);
            this._mapAndUpdateModel();
        }
    }

    /** @hidden */
    private async _setUpMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: MULTICOMBOBOX_COMPONENT, useValue: this }],
            parent: this._injector
        });

        await this._dynamicComponentService.createDynamicModule(
            { listTemplate: this.listTemplate, controlTemplate: this.mobileControlTemplate },
            PlatformMultiComboboxMobileModule,
            MultiComboboxMobileComponent,
            this._viewContainerRef,
            injector
        );
    }
}

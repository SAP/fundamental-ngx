import { A, DOWN_ARROW, ENTER, ESCAPE, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Inject,
    Injector,
    OnInit,
    Optional,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    isDevMode
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import equal from 'fast-deep-equal';

import { DynamicComponentService, KeyUtil, SearchHighlightPipe, warnOnce } from '@fundamental-ngx/cdk/utils';
import {
    DATA_PROVIDERS,
    DataProvider,
    MultiComboBoxDataSource,
    OptionItem,
    SelectableOptionItem
} from '@fundamental-ngx/platform/shared';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import {
    ContentDensityDirective,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { FormControlComponent, FormInputMessageGroupComponent, FormMessageComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule, ListSecondaryDirective } from '@fundamental-ngx/core/list';
import { MultiAnnouncerDirective } from '@fundamental-ngx/core/multi-combobox';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { TokenComponent, TokenizerComponent, TokenizerInputDirective } from '@fundamental-ngx/core/token';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { AutoCompleteDirective, AutoCompleteEvent } from '../../auto-complete/auto-complete.directive';
import { BaseMultiCombobox } from '../commons/base-multi-combobox';
import { MultiComboboxMobileComponent } from '../multi-combobox-mobile/multi-combobox/multi-combobox-mobile.component';
import { MULTICOMBOBOX_COMPONENT } from '../multi-combobox.interface';

let deprecationWarningShown = false;

/**
 * This component can work with both string primitives as well as with complex objects. In order
 * to use objects user must provide an unique ID to lookupkey, which will be used in comparing
 * each items of array. It is important to provide lookupkey value as there might be multiple
 * items with same name but different properties which is to be differently identified otherwise
 * it will be treated as same objects.
 */

@Component({
    selector: 'fdp-multi-combobox',
    templateUrl: './multi-combobox.component.html',
    styleUrl: './multi-combobox.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: FD_FORM_FIELD_CONTROL,
            useExisting: MultiComboboxComponent,
            multi: true
        },
        contentDensityObserverProviders()
    ],
    imports: [
        NgTemplateOutlet,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        FormInputMessageGroupComponent,
        InputGroupModule,
        TokenComponent,
        TokenizerComponent,
        TokenizerInputDirective,
        FormControlComponent,
        FormsModule,
        AutoCompleteDirective,
        FormMessageComponent,
        ListModule,
        CheckboxComponent,
        NgClass,
        ListSecondaryDirective,
        SearchHighlightPipe,
        FdTranslatePipe,
        ContentDensityDirective,
        MultiAnnouncerDirective
    ]
})
export class MultiComboboxComponent extends BaseMultiCombobox implements OnInit, AfterViewInit {
    /** @hidden */
    @ViewChild('mobileControlTemplate')
    mobileControlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    declare listTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild(TokenizerComponent)
    _tokenizer: TokenizerComponent;

    /**
     * @hidden
     * List of selected suggestions
     */
    _selectedSuggestions: SelectableOptionItem[] = [];

    /** @hidden */
    constructor(
        readonly _dynamicComponentService: DynamicComponentService,
        @Optional() @Inject(DATA_PROVIDERS) private _providers: Map<string, DataProvider<any>>,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
        readonly contentDensityObserver: ContentDensityObserver
    ) {
        super();

        if (!deprecationWarningShown && isDevMode()) {
            warnOnce(
                `[DEPRECATION] Platform Multi Combobox component is deprecated since v0.39.0. Please migrate to Core's version.`
            );
            deprecationWarningShown = true;
        }
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();

        const providers = this._providers?.size === 0 ? this.multiComboboxConfig.providers : this._providers;
        // if we have both prefer dataSource
        if (!this.dataSource && this.entityClass && providers?.has(this.entityClass)) {
            this.dataSource = new MultiComboBoxDataSource(providers.get(this.entityClass)!);
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
        const idx = this._getTokenIndexByIdlOrValue(item);

        if (idx === -1) {
            this._selectedSuggestions.push(item);
        } else {
            this._selectedSuggestions.splice(idx, 1);
        }

        item.selected = !item.selected;

        this._propagateChange();

        if (!this._selectedSuggestions.length) {
            this._focusToSearchField();
        }

        this.detectChanges();
    }

    /** @hidden */
    onOptionCheckboxClicked(event: MouseEvent, index: number): void {
        event.stopPropagation();
        this._onListElementClicked(event, index);
        this.inputText = '';
        this.searchTermChanged('');
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
        this._rangeSelector.reset();

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
        this.toggleSelection(token);
        this._rangeSelector.reset();
    }

    /** @hidden */
    moreClicked(): void {
        this._suggestions = this.isGroup
            ? this._convertObjectsToGroupOptionItems(this._selectedSuggestions.map(({ value }) => value))
            : this._suggestions.filter((value) =>
                  this._selectedSuggestions.some((item) => equal(item.value, value.value))
              );

        this.showList(true);
        this.selectedShown$.set(true);
        this.markForCheck();
    }

    /** @hidden */
    onBlur(event: FocusEvent): void {
        const target = event.relatedTarget as HTMLElement;
        if (target) {
            const isList = !!target.closest('.fdp-multi-combobox__list-container');
            if (isList) {
                return;
            }
            if (
                this._suggestions?.length === 1 &&
                this._suggestions[0].label === this.inputText &&
                !this._suggestions[0].selected
            ) {
                this.toggleSelection(this._suggestions[0]);
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
    onItemKeyDownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ESCAPE)) {
            this._focusToSearchField();
        } else if ((event.ctrlKey || event.metaKey) && event.shiftKey && KeyUtil.isKeyCode(event, A)) {
            event.preventDefault();
            this.handleSelectAllItems(false);
        } else if ((event.ctrlKey || event.metaKey) && KeyUtil.isKeyCode(event, A)) {
            event.preventDefault();
            this.handleSelectAllItems(true);
        } else if (KeyUtil.isKeyCode(event, ENTER)) {
            if (!this.mobile) {
                this.close();
            }
            this._rangeSelector.reset();
        } else if (KeyUtil.isKeyCode(event, SPACE)) {
            this._rangeSelector.reset();
        }
    }

    /** @hidden */
    onOptionClicked(event: MouseEvent, index: number): void {
        this._onListElementClicked(event, index);
        this.close();
    }

    /** @hidden */
    _addOnClicked(event: Event): void {
        this.addOnButtonClicked.emit(event);
        if (!this.mobile) {
            this.onPrimaryButtonClick(this.isOpen);
        }
    }

    /** @hidden Handle dialog dismissing, closes popover and sets backup data. */
    dialogDismiss(backup: SelectableOptionItem[]): void {
        this._selectedSuggestions = [...backup];
        this.inputText = '';
        this.showList(false);
        this.selectedShown$.set(false);
    }

    /** @hidden Handle dialog approval, closes popover and propagates data changes. */
    dialogApprove(): void {
        this.inputText = '';
        this.showList(false);
        this._propagateChange(true);
    }

    /**
     * @hidden
     * applying range selection. Note, that this function will be invoked after combobox item's value has been changed
     */
    private _onListElementClicked(event: MouseEvent, index: number): void {
        // value has been changed at this point, so it can be safely used
        const selectionState = this._suggestions[index].selected;
        this._rangeSelector.onRangeElementToggled(index, event);
        const toRemoveSet = new Set();
        this._rangeSelector.applyValueToEachInRange((idx) => {
            const current = this._suggestions[idx];
            if (current.selected !== selectionState) {
                if (current.selected) {
                    // removing from "_selectedSuggestions" list
                    toRemoveSet.add(current.value);
                } else {
                    // adding current item to "_selectedSuggestions"
                    this._selectedSuggestions.push(current);
                }
                current.selected = selectionState;
            }
        });
        this._selectedSuggestions = this._selectedSuggestions.filter((s) => !toRemoveSet.has(s.value));
        // selected items should be displayed in the same order as options
        const valueIndexes = new Map<any, number>(this._suggestions.map((s, i) => [s.value, i]));
        this._selectedSuggestions.sort((a, b) => valueIndexes.get(a.value)! - valueIndexes.get(b.value)!);
        this._tokenizer.onResize();

        this._tokenizer.tokenizerInnerEl.nativeElement.scrollLeft =
            this._tokenizer.tokenizerInnerEl.nativeElement.scrollWidth;
    }

    /** @hidden */
    private _getTokenIndexByIdlOrValue(item: SelectableOptionItem): number {
        return this._selectedSuggestions.findIndex((token) => token.id === item.id || equal(token.value, item.value));
    }

    /** @hidden */
    private _mapAndUpdateModel(): void {
        const selectedItems = this._selectedSuggestions.map(({ value }) => value);

        // setting value, it will call setValue()
        this.value = selectedItems;
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

        this._dynamicComponentService.createDynamicComponent(
            { listTemplate: this.listTemplate, controlTemplate: this.mobileControlTemplate },
            MultiComboboxMobileComponent,
            {
                containerRef: this._viewContainerRef
            },
            { injector }
        );
    }
}

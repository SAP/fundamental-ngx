import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, asyncScheduler, firstValueFrom } from 'rxjs';
import { observeOn, takeUntil } from 'rxjs/operators';

import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef
} from '@fundamental-ngx/core/dialog';
import { FdpSelectionChangeEvent, SelectComponent } from '@fundamental-ngx/platform/form';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import {
    RESETTABLE_TOKEN,
    ResetButtonComponent,
    Resettable,
    Table,
    TableColumnComponent,
    TableComponent,
    TableDataSource,
    TableRowSelectionChangeEvent,
    TableToolbarActionsComponent,
    TableToolbarComponent
} from '@fundamental-ngx/platform/table';

import { CdkScrollable } from '@angular/cdk/overlay';

import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import {
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import {
    FD_LANGUAGE,
    FdLanguage,
    FdLanguageKeyIdentifier,
    FdTranslatePipe,
    TranslationResolver
} from '@fundamental-ngx/i18n';
import {
    FdpCellDef,
    FdpTableCell,
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';
import { SmartFilterBarFieldDefinition } from '../../interfaces/smart-filter-bar-field-definition';
import { FieldFilterItem } from '../../interfaces/smart-filter-bar-field-filter-item';
import { SmartFilterSettingsDialogConfig } from '../../interfaces/smart-filter-bar-settings-dialog-config';
import { SmartFilterBarVisibilityCategoryLabels } from '../../interfaces/smart-filter-bar-visibility-category';
import { SmartFilterBarOptionsDataProvider } from './data-provider';

@Component({
    selector: 'fdp-smart-filter-bar-settings-dialog',
    templateUrl: './smart-filter-bar-settings-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: SmartFilterBarSettingsDialogComponent }],
    standalone: true,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TemplateDirective,
        BarLeftDirective,
        BarElementDirective,
        TitleComponent,
        BarRightDirective,
        ResetButtonComponent,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        TableComponent,
        TableInitialStateDirective,
        TableToolbarComponent,
        TableToolbarActionsComponent,
        SelectComponent,
        TableColumnComponent,
        FdpCellDef,
        FdpTableCell,
        IconComponent,
        DialogFooterComponent,
        ButtonBarComponent,
        BusyIndicatorComponent,
        FdTranslatePipe
    ]
})
export class SmartFilterBarSettingsDialogComponent implements Resettable, AfterViewInit, OnDestroy {
    /**
     * Table instance
     */
    @ViewChild('table') table!: Table;

    /**
     * Table data source.
     */
    source!: TableDataSource<FieldFilterItem>;

    /** @hidden */
    _availableFields!: FieldFilterItem[];

    /** @hidden */
    _filterVisibilityOptions: SelectItem[] = [];

    /** @hidden */
    loaded = false;

    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean>;

    /** @hidden */
    private readonly _categoryLabelKeys: SmartFilterBarVisibilityCategoryLabels = {
        all: 'settingsCategoryAll',
        visible: 'settingsCategoryVisible',
        active: 'settingsCategoryActive',
        visibleAndActive: 'settingsCategoryVisibleAndActive',
        mandatory: 'settingsCategoryMandatory'
    };

    /** @hidden */
    private _sourceSubscription!: Subscription;

    /** @hidden */
    private _selectedFilters: string[] = [];

    /**
     * @hidden
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /** @hidden */
    private readonly _translationResolver = new TranslationResolver();

    /** @hidden */
    constructor(
        private _dialogRef: DialogRef<SmartFilterSettingsDialogConfig, string[]>,
        @Inject(FD_LANGUAGE) private readonly _language$: Observable<FdLanguage>,
        private readonly _cdr: ChangeDetectorRef
    ) {
        this.isResetAvailable$ = this._isResetAvailableSubject$.asObservable();
        this.setInitialTableState();
        this._init();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.setSelectedFilters();
    }

    /**
     * Checks the checkbox in the table row if the field is selected.
     */
    setSelectedFilters(): void {
        this._sourceSubscription?.unsubscribe();
        this._sourceSubscription = this.source
            .open()
            .pipe(observeOn(asyncScheduler), takeUntil(this._onDestroy$))
            .subscribe((items) => {
                items.forEach((field, index) => {
                    if (field.visible) {
                        this.table.toggleSelectableRow(index);
                    }
                });
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * Resets filters selection.
     */
    reset(): void {
        this.setInitialTableState();
        this.setSelectedFilters();
    }

    /**
     * Sets initial state of the table.
     */
    setInitialTableState(): void {
        this._availableFields = this._dialogRef.data.fields
            .filter((c: SmartFilterBarFieldDefinition) => c.filterable)
            .map((c: SmartFilterBarFieldDefinition) => ({
                label: c.label,
                active: !!this._dialogRef.data.filterBy.find((f) => f.field === c.name),
                mandatory: c.required,
                visible: this._dialogRef.data.selectedFilters.includes(c.name),
                key: c.key,
                name: c.name
            }));

        this.source = new TableDataSource(new SmartFilterBarOptionsDataProvider(this._availableFields));
    }

    /** @hidden */
    _cancel(): void {
        this._dialogRef.dismiss();
    }

    /** @hidden */
    _confirm(): void {
        this._dialogRef.close(this._selectedFilters);
    }

    /** @hidden */
    _onRowSelectionChange(event: TableRowSelectionChangeEvent<FieldFilterItem>): void {
        this._selectedFilters = event.selection.map((c) => c.name);
        this._isResetAvailableSubject$.next(true);
    }

    /** @hidden */
    _onFilterVisibilityChange(event: FdpSelectionChangeEvent): void {
        if (!this.table) {
            return;
        }
        (this.source.dataProvider as SmartFilterBarOptionsDataProvider).filter(event.payload);
        this.source.fetch(this.table.getTableState());
    }

    /** @hidden */
    private async _init(): Promise<void> {
        await this._transformVisibilityLabels();
        this.loaded = true;
        this._cdr.markForCheck();
    }

    /**
     * Transforms visibility options into appropriate select item object.
     */
    private async _transformVisibilityLabels(): Promise<void> {
        const lang = await firstValueFrom(this._language$);
        const labels = { ...this._categoryLabelKeys };
        for (const strategyItem in labels) {
            if (Object.prototype.hasOwnProperty.call(labels, strategyItem)) {
                const translationKey = ('platformSmartFilterBar.' +
                    labels[strategyItem as keyof SmartFilterBarVisibilityCategoryLabels]) as FdLanguageKeyIdentifier;
                labels[strategyItem] = this._translationResolver.resolve(lang, translationKey);
            }
        }
        for (const [selectValue, selectLabel] of Object.entries(labels)) {
            this._filterVisibilityOptions.push({
                label: selectLabel,
                value: selectValue
            });
        }
    }
}

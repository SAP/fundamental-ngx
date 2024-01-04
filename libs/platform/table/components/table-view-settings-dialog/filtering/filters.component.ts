import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    signal,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import equal from 'fast-deep-equal/es6';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DialogRef } from '@fundamental-ngx/core/dialog';

import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import {
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import {
    CollectionFilter,
    FilterType,
    Table,
    TableColumn,
    TableDialogCommonData
} from '@fundamental-ngx/platform/table-helpers';
import { ResetButtonComponent, Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';
import { TableViewSettingsFilterComponent } from '../table-view-settings-filter.component';
import { FilterStepComponent } from './filter-step.component';
import { FILTERS_VIEW_STEP_TOKEN, FiltersViewStep } from './filters-active-step';
import { FiltersListStepComponent, SelectableFilter } from './filters-list-step.component';

export interface FiltersDialogData extends TableDialogCommonData {
    filterBy: CollectionFilter[];
    columns: TableColumn[];
    viewSettingsFilters: TableViewSettingsFilterComponent[];
}

export interface FiltersDialogResultData {
    filterBy: CollectionFilter[];
}

export enum ACTIVE_STEP {
    SELECT_FILTER = 'SELECT_FILTER',
    FILTER = 'FILTER'
}

@Component({
    templateUrl: './filters.component.html',
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: forwardRef(() => FiltersComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TemplateDirective,
        BarLeftDirective,
        BarElementDirective,
        NgTemplateOutlet,
        BarRightDirective,
        ResetButtonComponent,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        DialogFooterComponent,
        ButtonBarComponent,
        FiltersListStepComponent,
        FilterStepComponent,
        FdTranslatePipe
    ]
})
export class FiltersComponent implements Resettable, AfterViewInit {
    /** Reference to the available steps */
    readonly ACTIVE_STEP = ACTIVE_STEP;

    /** Currently applied filters rules */
    filterBy: CollectionFilter[];

    /** Table columns. Used to retrieve a column key */
    columns: TableColumn[];

    /** Declared filters options */
    viewSettingsFilters: TableViewSettingsFilterComponent[];

    /** Currently selected step */
    activeStep: ACTIVE_STEP = ACTIVE_STEP.SELECT_FILTER;

    /** Currently selected filter to drill down */
    activeFilter: TableViewSettingsFilterComponent | null = null;

    /** Table column key associated with the currently selected filter  */
    activeFilterColumnKey: Nullable<string> = null;

    /** Indicates when reset command is available */
    readonly isResetAvailable$ = signal(false);

    /** @hidden */
    private _initialFilters: CollectionFilter[] = [];

    /**
     * Current FiltersViewStep component to render.
     * The fd-dialog component relies on named projected content.
     * It means we must define all projected dialog options in the same view withing fd-dialog.
     * In order to keep filters steps as separate components
     * and do not break dialog content we are using this ViewChild hook
     * keeping reference to the conditionally rendered active step.
     * Each "FilterStepView" has template refs for dialog.title and dialog.body template
     * */
    @ViewChild(FILTERS_VIEW_STEP_TOKEN)
    set setActiveFilterStepView(view: FiltersViewStep) {
        this.activeFilterStepView = view;
        this._cd.detectChanges();
    }

    /** Current step component to render */
    activeFilterStepView: FiltersViewStep;

    /** @hidden */
    constructor(
        public readonly dialogRef: DialogRef<FiltersDialogData>,
        private readonly _cd: ChangeDetectorRef,
        private readonly _table: Table
    ) {
        const dialogData = this.dialogRef.data;
        this.filterBy = [...dialogData.filterBy];
        this.viewSettingsFilters = dialogData.viewSettingsFilters;
        this.columns = dialogData.columns;

        this._setInitialFilters();
        this._compareSelectedFilters();
    }

    /** Need it to keep activeFilterStepView rendering up to date */
    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    /** Select filter to drill down */
    selectFilter(filter: SelectableFilter): void {
        this.activeStep = ACTIVE_STEP.FILTER;
        this.activeFilter = filter as TableViewSettingsFilterComponent;
        this.activeFilterColumnKey = this.columns.find(
            ({ name }) => name === (<TableViewSettingsFilterComponent>filter).column
        )?.key;
        this._cd.detectChanges();
    }

    /** Go back to the top filters list */
    goToFilters(): void {
        this.activeStep = ACTIVE_STEP.SELECT_FILTER;
        this.activeFilter = null;
    }

    /** Apply filter rule changes and emit the event */
    applyFilter(filter: CollectionFilter, { type }: TableViewSettingsFilterComponent): void {
        if (!filter) {
            return;
        }
        // exclude this filter from filters list
        this.filterBy = this.filterBy.filter(({ field }) => field !== filter.field);

        const filterIsNotEmpty =
            type === FilterType.CUSTOM ||
            (type === FilterType.MULTI && filter.value?.length) ||
            (type === FilterType.SINGLE && filter.value?.length);

        // if filter is not empty add it to the list
        if (filterIsNotEmpty) {
            this.filterBy.push(filter);
        }

        this._compareSelectedFilters();

        // To fix "Expression has changed after it was checked"
        this._cd.detectChanges();
    }

    /** Reset changes to the initial state */
    reset(): void {
        this.filterBy = this._initialFilters;
        this.isResetAvailable$.set(false);
        this._cd.detectChanges();
    }

    /** Close dialog */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const result: FiltersDialogResultData = { filterBy: this.filterBy };
        this.dialogRef.close(result);
    }

    /** @hidden */
    private _setInitialFilters(): void {
        this._initialFilters = this._table.initialState?.initialFilterBy ?? [];
    }

    /** @hidden */
    private _compareSelectedFilters(): void {
        if (equal(this._initialFilters, this.filterBy)) {
            return;
        }

        this.isResetAvailable$.set(true);
    }
}

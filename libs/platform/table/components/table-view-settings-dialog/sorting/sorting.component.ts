import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    input,
    linkedSignal,
    output,
    untracked,
    viewChildren,
    ViewEncapsulation
} from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { FormGroupComponent } from '@fundamental-ngx/core/form';
import {
    ListComponent,
    ListGroupHeaderDirective,
    ListItemComponent,
    ListSecondaryDirective,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CollectionSort, SortDirection } from '@fundamental-ngx/platform/table-helpers';
import { distinctUntilChanged } from 'rxjs';
import {
    INITIAL_DIRECTION,
    NOT_SORTED_OPTION_VALUE,
    SettingsSortDialogColumn,
    SettingsSortDialogData,
    SettingsSortDialogResultData
} from '../table-view-settings.model';

/** Represents a single sort criteria row */
export interface SortCriteria {
    field: string | null;
    direction: SortDirection;
}

let sortOrderHeaderUniqueId = 0;
let sortDialogSortByHeaderUniqueId = 0;

@Component({
    selector: 'fdp-sorting',
    templateUrl: './sorting.component.html',
    styleUrl: './sorting.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        ListComponent,
        ListGroupHeaderDirective,
        ListTitleDirective,
        ListItemComponent,
        ListSecondaryDirective,
        RadioButtonComponent,
        FormsModule,
        FdTranslatePipe,
        SegmentedButtonComponent,
        ButtonComponent,
        ComboboxComponent,
        FormGroupComponent
    ]
})
export class SortingComponent {
    /** Input data for sorting */
    sortingData = input<SettingsSortDialogData>();

    /** @hidden Initial sorting state */
    initialSorting = input<Nullable<CollectionSort>>();

    /** Event emitter for sort changes */
    sortChange = output<SettingsSortDialogResultData>();

    /** Event emitter for reset availability changes */
    resetAvailabilityChange = outputFromObservable(
        toObservable(
            computed(() => {
                const initial = this.initialSorting();
                if (!initial) {
                    return false;
                }

                // Get current sort criteria (only those with fields selected)
                const currentCriteria = this.sortCriteriaList().filter((c) => c.field !== null);

                // Build initial criteria array for comparison
                const initialCriteria =
                    initial.field !== null ? [{ field: initial.field, direction: initial.direction }] : [];

                // Reset is available if:
                // 1. Number of sort criteria changed
                // 2. Any criteria field/direction differs from initial
                // 3. Combobox has invalid text
                if (currentCriteria.length !== initialCriteria.length) {
                    return true;
                }

                for (let i = 0; i < currentCriteria.length; i++) {
                    if (
                        currentCriteria[i].field !== initialCriteria[i]?.field ||
                        currentCriteria[i].direction !== initialCriteria[i]?.direction
                    ) {
                        return true;
                    }
                }

                return this._hasInvalidComboboxText();
            })
        ).pipe(distinctUntilChanged())
    );

    /** Event emitter for validity changes */
    validityChange = outputFromObservable(
        toObservable(
            computed(() => {
                const invalidMap = this._invalidInputPerRow();
                // Valid if no rows have invalid input
                for (const isInvalid of invalidMap.values()) {
                    if (isInvalid) {
                        return false;
                    }
                }
                return true;
            })
        ).pipe(distinctUntilChanged())
    );

    /** @hidden */
    sortOrderHeaderId = `fdp-table-sort-order-header-${sortOrderHeaderUniqueId++}`;

    /** @hidden */
    sortDialogSortByHeaderId = `fdp-table-sort-dialog-sort-by-header-${sortDialogSortByHeaderUniqueId++}`;

    /** @hidden Constants for sort direction */
    readonly SORT_DIRECTION = SortDirection;

    /** @hidden Constant for 'Not sorted' option value */
    readonly NOT_SORTED_OPTION_VALUE = NOT_SORTED_OPTION_VALUE;

    /** Whether disabling sorting is allowed */
    allowDisablingSorting = computed(() => this.sortingData()?.allowDisablingSorting ?? false);

    /** Available table columns for sorting */
    columns = computed(() => this.sortingData()?.columns ?? []);

    /** @hidden Computed signal that checks if any row has invalid input */
    isValid = computed(() => {
        const invalidMap = this._invalidInputPerRow();
        // Valid if no rows have invalid input
        for (const isInvalid of invalidMap.values()) {
            if (isInvalid) {
                return false;
            }
        }
        return true;
    });

    /** @hidden Computed signal that returns the currently selected column object */
    selectedColumn = computed(() => {
        const currentField = this.firstSortingField();
        return this.columns().find((col) => col.key === currentField) ?? null;
    });

    /**
     * @hidden
     * Computed signal that returns available columns for each row.
     * Columns selected in other rows are filtered out.
     */
    availableColumnsPerRow = computed(() => {
        const allColumns = this.columns();
        const criteriaList = this.sortCriteriaList();

        return criteriaList.map((_, rowIndex) => {
            // Collect fields selected in OTHER rows
            const selectedFieldsInOtherRows = new Set(
                criteriaList.filter((c, index) => index !== rowIndex && c.field !== null).map((c) => c.field)
            );

            // Return columns not selected in other rows
            return allColumns.filter((col) => !selectedFieldsInOtherRows.has(col.key));
        });
    });

    /**
     * @hidden
     * Computed signal that returns the selected column object for each row.
     */
    selectedColumnsPerRow = computed(() => {
        const allColumns = this.columns();
        const criteriaList = this.sortCriteriaList();

        return criteriaList.map((criteria) => {
            if (!criteria.field) {
                return null;
            }
            return allColumns.find((col) => col.key === criteria.field) ?? null;
        });
    });

    /**
     * @hidden
     * Computed signal that returns the direction for each row.
     */
    directionsPerRow = computed(() =>
        this.sortCriteriaList().map((criteria) => criteria.direction ?? INITIAL_DIRECTION)
    );

    /**
     * @hidden
     * Computed signal that returns the form state ('error' or undefined) for each row.
     */
    rowStates = computed(() => {
        const invalidMap = this._invalidInputPerRow();
        return this.sortCriteriaList().map((_, index) => (invalidMap.get(index) ? 'error' : undefined));
    });

    /**
     * @hidden
     * Computed signal that returns visibility for each row.
     * First row is always visible, subsequent rows visible only if previous has selection.
     */
    rowVisibility = computed(() => {
        const criteriaList = this.sortCriteriaList();
        return criteriaList.map((_, index) => {
            if (index === 0) {
                return true;
            }
            return criteriaList[index - 1]?.field !== null;
        });
    });

    /**
     * @hidden
     * Computed signal that returns whether each row can be moved up.
     */
    canMoveUpPerRow = computed(() => {
        const criteriaList = this.sortCriteriaList();
        return criteriaList.map((criteria, index) => {
            if (index === 0) {
                return false;
            }
            return criteria.field !== null;
        });
    });

    /**
     * @hidden
     * Computed signal that returns whether each row can be moved down.
     */
    canMoveDownPerRow = computed(() => {
        const criteriaList = this.sortCriteriaList();
        return criteriaList.map((criteria, index) => {
            const nextRow = criteriaList[index + 1];
            // Can't move down if current row has no selection
            if (criteria.field === null) {
                return false;
            }
            // Can't move down if next row doesn't exist or has no selection
            return nextRow !== undefined && nextRow.field !== null;
        });
    });

    /**
     * @hidden
     * Computed signal that returns whether each row can be deleted.
     */
    canDeletePerRow = computed(() => this.sortCriteriaList().map((criteria) => criteria.field !== null));

    /** Current selected sorting direction - derived from first sortBy entry */
    direction = linkedSignal(() => this.sortingData()?.sortBy?.[0]?.direction ?? INITIAL_DIRECTION);

    /** Current selected sorting field - derived from first sortBy entry */
    firstSortingField = linkedSignal(() => this.sortingData()?.sortBy?.[0]?.field ?? NOT_SORTED_OPTION_VALUE);

    /**
     * @hidden
     * Array of sort criteria rows. Each row has a field and direction.
     * linkedSignal resets when sortBy reference changes (e.g., on reset),
     * but allows local modifications via .set()/.update().
     */
    sortCriteriaList = linkedSignal(() => {
        // Only track sortBy reference changes, not all sortingData changes
        const sortBy = this._sortByRef() ?? [];
        // Use untracked for columns since we don't want column changes to reset the list
        const columns = untracked(() => this.sortingData()?.columns ?? []);

        return columns.map((_, index) => {
            const existingCriteria = sortBy[index];
            if (existingCriteria) {
                return {
                    field: existingCriteria.field,
                    direction: existingCriteria.direction
                };
            }
            return { field: null, direction: INITIAL_DIRECTION } as SortCriteria;
        });
    });

    /**
     * @hidden
     * Extracts the sortBy array reference from sortingData.
     * Used as the source for linkedSignal to track only sortBy reference changes.
     */
    private _sortByRef = computed(() => this.sortingData()?.sortBy);

    /**
     * @hidden
     * Tracks invalid input text per row (non-empty text that doesn't match any column).
     * Resets to empty Map when sortBy reference changes.
     */
    private _invalidInputPerRow = linkedSignal<Map<number, boolean>>(() => {
        // Only track sortBy reference changes
        this._sortByRef();
        return new Map();
    });

    /**
     * @hidden
     * Computed signal that checks if any row has invalid combobox text.
     * Used by resetAvailabilityChange to determine if reset should be available.
     */
    private _hasInvalidComboboxText = computed(() => {
        const invalidMap = this._invalidInputPerRow();
        for (const isInvalid of invalidMap.values()) {
            if (isInvalid) {
                return true;
            }
        }
        return false;
    });

    /** @hidden Reference to the comboboxes for programmatic reset */
    private _comboboxes = viewChildren<ComboboxComponent>('sortCombobox');

    /** @hidden Track previous sortBy reference for combobox sync */
    private _previousSortByRef: Array<{ field: string; direction: SortDirection }> | undefined;

    /** @hidden */
    constructor() {
        // DOM side effect: sync combobox display text when sortBy reference changes.
        // This is needed because when user types invalid text and reset happens,
        // the model value might not change but the display text needs to update.
        effect(() => {
            const sortBy = this._sortByRef();
            // Only sync when reference changes (not on every sortingData update)
            if (sortBy !== this._previousSortByRef) {
                this._previousSortByRef = sortBy;
                // Use untracked to avoid creating additional dependencies
                untracked(() => this._syncComboboxDisplayText());
            }
        });
    }

    /**
     * Get available columns for a specific sort criteria row.
     * Excludes columns that are already selected in other rows.
     * @param rowIndex Index of the current row.
     * @returns Array of columns available for selection.
     */
    getAvailableColumns(rowIndex: number): SettingsSortDialogColumn[] {
        return this.availableColumnsPerRow()[rowIndex] ?? [];
    }

    /**
     * Get the selected column object for a specific row.
     * @param rowIndex Index of the row.
     * @returns The selected column object or null.
     */
    getSelectedColumnForRow(rowIndex: number): SettingsSortDialogColumn | null {
        return this.selectedColumnsPerRow()[rowIndex] ?? null;
    }

    /**
     * Get the direction for a specific row.
     * @param rowIndex Index of the row.
     * @returns The sort direction.
     */
    getDirectionForRow(rowIndex: number): SortDirection {
        return this.directionsPerRow()[rowIndex] ?? INITIAL_DIRECTION;
    }

    /**
     * Get the form state for a specific row's combobox.
     * Returns 'error' if the row has invalid input, undefined otherwise.
     * @param rowIndex Index of the row.
     * @returns The form state or undefined.
     */
    getRowState(rowIndex: number): 'error' | undefined {
        return this.rowStates()[rowIndex];
    }

    /**
     * Determine if a row should be visible.
     * The first row is always visible. Subsequent rows are only visible
     * if the previous row has a column selected.
     * @param rowIndex Index of the row.
     * @returns True if the row should be visible.
     */
    isRowVisible(rowIndex: number): boolean {
        return this.rowVisibility()[rowIndex] ?? false;
    }

    /**
     * Check if a row can be moved up.
     * A row can move up if it's not the first row and has a field selected.
     * @param rowIndex Index of the row.
     * @returns True if the row can be moved up.
     */
    canMoveUp(rowIndex: number): boolean {
        return this.canMoveUpPerRow()[rowIndex] ?? false;
    }

    /**
     * Check if a row can be moved down.
     * A row can move down if there's a visible row below it with a field selected.
     * @param rowIndex Index of the row.
     * @returns True if the row can be moved down.
     */
    canMoveDown(rowIndex: number): boolean {
        return this.canMoveDownPerRow()[rowIndex] ?? false;
    }

    /**
     * Check if a row can be deleted (cleared).
     * A row can be deleted if it has a field selected.
     * @param rowIndex Index of the row.
     * @returns True if the row can be deleted.
     */
    canDelete(rowIndex: number): boolean {
        return this.canDeletePerRow()[rowIndex] ?? false;
    }

    /**
     * Move a sort criteria row up (swap with the row above).
     * @param rowIndex Index of the row to move up.
     */
    moveUp(rowIndex: number): void {
        if (!this.canMoveUpPerRow()[rowIndex]) {
            return;
        }

        this.sortCriteriaList.update((list) => {
            const newList = [...list];
            // Swap with the row above
            [newList[rowIndex - 1], newList[rowIndex]] = [newList[rowIndex], newList[rowIndex - 1]];
            return newList;
        });

        this._syncMainFieldAndDirection();
        this._onModelChange();
    }

    /**
     * Move a sort criteria row down (swap with the row below).
     * @param rowIndex Index of the row to move down.
     */
    moveDown(rowIndex: number): void {
        if (!this.canMoveDownPerRow()[rowIndex]) {
            return;
        }

        this.sortCriteriaList.update((list) => {
            const newList = [...list];
            // Swap with the row below
            [newList[rowIndex], newList[rowIndex + 1]] = [newList[rowIndex + 1], newList[rowIndex]];
            return newList;
        });

        this._syncMainFieldAndDirection();
        this._onModelChange();
    }

    /**
     * Delete (clear) a sort criteria row.
     * This removes the field selection and shifts remaining criteria up.
     * @param rowIndex Index of the row to delete.
     */
    deleteRow(rowIndex: number): void {
        if (!this.canDeletePerRow()[rowIndex]) {
            return;
        }

        this.sortCriteriaList.update((list) => {
            const newList = [...list];
            // Remove the criteria at this index and add an empty one at the end
            newList.splice(rowIndex, 1);
            newList.push({ field: null, direction: INITIAL_DIRECTION });
            return newList;
        });

        this._syncMainFieldAndDirection();
        this._onModelChange();
    }

    /**
     * Handle sort direction changes for a specific row.
     * @param rowIndex Index of the row.
     * @param direction New sorting direction.
     */
    _sortDirectionChangeForRow(rowIndex: number, direction: SortDirection): void {
        this.sortCriteriaList.update((list) => {
            const newList = [...list];
            newList[rowIndex] = { ...newList[rowIndex], direction };
            return newList;
        });

        // Update the main direction if this is the first row (for backward compatibility)
        if (rowIndex === 0) {
            this.direction.set(direction);
        }

        // Always emit changes for multi-column sorting
        this._onModelChange();
    }

    /**
     * Handle sort field changes for a specific row.
     * @param rowIndex Index of the row.
     * @param column Selected column object or string.
     */
    _sortFieldChangeForRow(rowIndex: number, column: SettingsSortDialogColumn | string | null): void {
        let fieldKey: string | null = null;
        let shouldUpdate = true;
        let isInvalid = false;

        if (typeof column === 'string') {
            if (column === '') {
                // Empty string - clear any error state and don't update selection
                // This can happen when combobox re-renders and emits empty value
                shouldUpdate = false;
                isInvalid = false;
            } else {
                const matchingColumn = this.columns().find((col) => col.label === column);
                fieldKey = matchingColumn?.key ?? null;

                // Check if any column label starts with the typed text (case-insensitive)
                // This handles the case where user is still typing and autocomplete is showing suggestions
                const hasPartialMatch = this.columns().some((col) =>
                    col.label.toLowerCase().startsWith(column.toLowerCase())
                );

                // Mark as invalid only if text doesn't match any column AND no partial matches exist
                isInvalid = matchingColumn === undefined && !hasPartialMatch;

                // Only update if we found a matching column
                shouldUpdate = matchingColumn !== undefined;
            }
        } else if (column) {
            fieldKey = column.key;
            isInvalid = false;
        } else {
            // null/undefined column - don't clear existing selection
            // This can happen when combobox re-renders
            shouldUpdate = false;
            isInvalid = false;
        }

        // Update invalid state for this row
        this._invalidInputPerRow.update((map) => {
            const newMap = new Map(map);
            if (isInvalid) {
                newMap.set(rowIndex, true);
            } else {
                newMap.delete(rowIndex);
            }
            return newMap;
        });

        if (shouldUpdate) {
            this.sortCriteriaList.update((list) => {
                const newList = [...list];
                newList[rowIndex] = { ...newList[rowIndex], field: fieldKey };
                return newList;
            });

            // Update the main field if this is the first row (for backward compatibility)
            if (rowIndex === 0 && fieldKey !== null) {
                this.firstSortingField.set(fieldKey);
            }

            // Always emit changes for multi-column sorting
            this._onModelChange();
        }
    }

    /** @hidden */
    protected displayColumn(column: SettingsSortDialogColumn | null): string {
        return column?.label ?? '';
    }

    /**
     * Sync the main field and direction signals with the first row's values.
     * Used after move/delete operations to keep backward compatibility.
     * @hidden
     */
    private _syncMainFieldAndDirection(): void {
        const firstCriteria = this.sortCriteriaList()[0];
        if (firstCriteria) {
            this.firstSortingField.set(firstCriteria.field);
            this.direction.set(firstCriteria.direction);
        }
    }

    /**
     * Emit changes to the model.
     * @hidden
     */
    private _onModelChange(): void {
        // Build array of all sort criteria that have a field selected
        const sortBy = this.sortCriteriaList()
            .filter((criteria) => criteria.field !== null)
            .map((criteria) => ({
                field: criteria.field as string,
                direction: criteria.direction
            }));

        this.sortChange.emit({ sortBy });
    }

    /**
     * Sync combobox display text with the current selected column.
     * This is a DOM side effect needed when reset happens and the combobox has invalid text,
     * because ngModel won't call writeValue if the underlying model value hasn't changed.
     * @hidden
     */
    private _syncComboboxDisplayText(): void {
        const comboboxes = this._comboboxes();
        if (comboboxes.length > 0) {
            const column = this.selectedColumn();
            comboboxes[0].writeValue(column);
        }
    }
}

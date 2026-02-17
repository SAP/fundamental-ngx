import { InputSignal, Signal, WritableSignal } from '@angular/core';
import { SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { MobileMode } from '@fundamental-ngx/core/mobile-mode';
import { Subject } from 'rxjs';

export interface MultiCombobox<T = any> {
    selectedItems: Signal<T[]>;
    displayKey: InputSignal<string>;
    lookupKey: InputSignal<string>;
    showSecondaryText: InputSignal<boolean>;
    secondaryKey: InputSignal<string>;
    groupKey: InputSignal<string>;
    isGroup: Signal<boolean>;
    _suggestions: Signal<SelectableOptionItem[]>;
    _selectedSuggestions: Signal<SelectableOptionItem<T>[]>;
}

/**
 * Combobox Interface to have typing and avoid circular dependency between
 * MultiComboboxComponent <==> MultiComboboxMobileComponent
 */
export interface MobileMultiComboboxInterface extends MobileMode, MultiCombobox {
    selectedShown: WritableSignal<boolean>;
    openChange: Subject<boolean>;

    _moreClicked(): void;
    _dialogApprove(): void;
    _dialogDismiss(backup: SelectableOptionItem[]): void;
    _searchTermChanged(term?: string): void;
}

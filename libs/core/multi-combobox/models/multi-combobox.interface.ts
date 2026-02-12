import { Signal, WritableSignal } from '@angular/core';
import { SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { MobileMode } from '@fundamental-ngx/core/mobile-mode';
import { Subject } from 'rxjs';

export interface MultiCombobox<T = any> {
    selectedItems: T[];
    displayKey: string;
    lookupKey: string;
    showSecondaryText: boolean;
    secondaryKey: string;
    groupKey: string;
    isGroup: boolean;
    _suggestions: Signal<SelectableOptionItem[]>;
    _selectedSuggestions: Signal<SelectableOptionItem[]>;
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

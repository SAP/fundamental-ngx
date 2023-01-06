import { MobileMode } from '@fundamental-ngx/core/mobile-mode';
import { SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { BehaviorSubject, Subject } from 'rxjs';

export interface MultiCombobox<T = any> {
    selectedItems: T[];
    displayKey: string;
    lookupKey: string;
    showSecondaryText: boolean;
    secondaryKey: string;
    groupKey: string;
    isGroup: boolean;
    _suggestions: SelectableOptionItem[];
    _selectedSuggestions: SelectableOptionItem[];
}

/**
 * Combobox Interface to have typing and avoid circular dependency between
 * MultiComboboxComponent <==> MultiComboboxMobileComponent
 */
export interface MobileMultiComboboxInterface extends MobileMode, MultiCombobox {
    selectedShown$: BehaviorSubject<boolean>;
    openChange: Subject<boolean>;

    moreClicked(): void;
    dialogApprove(): void;
    dialogDismiss(backup: SelectableOptionItem[]): void;
    searchTermChanged(term?: string): void;
}

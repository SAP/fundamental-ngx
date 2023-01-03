import { InjectionToken } from '@angular/core';
import { SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { BehaviorSubject, Subject } from 'rxjs';

import { MobileMode } from '@fundamental-ngx/core/mobile-mode';

export const MULTI_COMBOBOX_COMPONENT = new InjectionToken<MultiComboboxInterface>('FdMultiComboboxInterface');

/**
 * Combobox Interface to have typing and avoid circular dependency between
 * MultiComboboxComponent <==> MultiComboboxMobileComponent
 */
export interface MultiComboboxInterface extends MobileMode {
    _suggestions: SelectableOptionItem[];
    _selectedSuggestions: SelectableOptionItem[];
    selectedShown$: BehaviorSubject<boolean>;
    openChange: Subject<boolean>;

    moreClicked(): void;
    dialogApprove(): void;
    dialogDismiss(backup: SelectableOptionItem[]): void;
    searchTermChanged(term?: string): void;
}

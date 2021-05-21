import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { MobileMode } from '@fundamental-ngx/core';
import { SelectableOptionItem } from '../../../domain';

export const MULTICOMBOBOX_COMPONENT = new InjectionToken<string[]>('MultiComboboxInterface');

/**
 * Combobox Interface to have typing and avoid circular dependency between
 * MultiComboboxComponent <==> MultiComboboxMobileComponent
 */
export interface MultiComboboxInterface extends MobileMode {
    _suggestions: SelectableOptionItem[];
    _selected: SelectableOptionItem[];
    selectedShown$: BehaviorSubject<boolean>;
    openChange: Subject<boolean>;

    moreClicked(): void;
    dialogApprove(): void;
    dialogDismiss(backup: SelectableOptionItem[]): void;
    searchTermChanged(term?: string): void;
}

import { MobileMode } from '@fundamental-ngx/core/mobile-mode';
import { SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { BehaviorSubject, Subject } from 'rxjs';

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

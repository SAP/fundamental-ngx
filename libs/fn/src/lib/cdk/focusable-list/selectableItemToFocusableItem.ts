import { SelectableItemToken } from '../selectable-list/SelectableItemToken';
import { FocusableItem } from './focusable-list.service';

export function selectableItemToFocusableItem(selectableItem: SelectableItemToken): FocusableItem {
    return {
        elementRef: () => selectableItem.elementRef(),
        focus: () => selectableItem.elementRef().nativeElement.focus(),
        focusable: () => selectableItem.selectable !== false
    };
}

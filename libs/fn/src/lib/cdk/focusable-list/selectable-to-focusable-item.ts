import { SelectableItemToken } from '../selectable-list/selectable-item.token';
import { FocusableItem } from './focusable-list.service';

export function selectableItemToFocusableItem(selectableItem: SelectableItemToken): FocusableItem {
    return {
        elementRef: () => selectableItem.elementRef(),
        focus: () => selectableItem.elementRef().nativeElement.focus(),
        focusable: () => selectableItem.fnSelectableItem !== false
    };
}

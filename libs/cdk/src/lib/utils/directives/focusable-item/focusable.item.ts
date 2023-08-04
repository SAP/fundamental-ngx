import { FocusableOption } from '@angular/cdk/a11y';
import { Observable } from 'rxjs';
import { FocusableItemPosition } from './focusable-item.directive';

export interface FocusableItem extends FocusableOption {
    _position?: FocusableItemPosition;
    isFocusable: (() => boolean) | boolean;
    keydown: Observable<KeyboardEvent>;
    setTabbable: (tabbable: boolean) => void;
    element: (() => HTMLElement) | HTMLElement;
}

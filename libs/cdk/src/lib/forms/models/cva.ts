import { ControlValueAccessor, NgControl } from '@angular/forms';

export interface BaseCVA extends ControlValueAccessor {
    ngControl: NgControl | null;
}

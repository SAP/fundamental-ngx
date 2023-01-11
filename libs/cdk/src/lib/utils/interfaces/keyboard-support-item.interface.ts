import { EventEmitter } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

export interface KeyboardSupportItemInterface extends FocusableOption {
    keyDown: EventEmitter<KeyboardEvent>;
    click(): void;
}

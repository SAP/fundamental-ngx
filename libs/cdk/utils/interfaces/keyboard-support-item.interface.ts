import { FocusableOption } from '@angular/cdk/a11y';
import { EventEmitter } from '@angular/core';

export interface KeyboardSupportItemInterface extends FocusableOption {
    keyDown: EventEmitter<KeyboardEvent>;
    click(): void;
}

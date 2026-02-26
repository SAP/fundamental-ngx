import { FocusableOption } from '@angular/cdk/a11y';
import { OutputEmitterRef } from '@angular/core';

export interface KeyboardSupportItemInterface extends FocusableOption {
    keyDown: OutputEmitterRef<KeyboardEvent>;
    click(): void;
}

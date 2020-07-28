import { Directive, HostListener, SkipSelf } from '@angular/core';

import { KeyUtil } from '@fundamental-ngx/core';

import { StepInputComponent } from './base.step-input';

/**
 * This directive is intendant to be a bridge between input control and BaseStepInput Component.
 */
@Directive({
    selector: '[fdpStepInputControl]'
})
export class StepInputControlDirective {
    /** @hidden */
    constructor(@SkipSelf() private stepInput: StepInputComponent) {}

    /**
     * @hidden
     * Handle "change" event
     */
    @HostListener('change', ['$event'])
    onChange() {
        if (!this.stepInput._canChangeValue) {
            return;
        }
        const value: string = (event.target as HTMLInputElement).value;
        this.stepInput.commitEnteredValue(value);
        this.stepInput.detectChanges();
    }

    /**
     * @hidden
     * Handle "focus" event
     */
    @HostListener('focus')
    onFocus() {
        this.stepInput.onFocus();
        this.stepInput.detectChanges();
    }

    /**
     * @hidden
     * Handle "blur" event
     */
    @HostListener('blur')
    onBlur() {
        this.stepInput.onBlur();
        this.stepInput.detectChanges();
    }

    /**
     * @hidden
     * Handle "keydown" event
     */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (!this.stepInput._canChangeValue) {
            return;
        }
        if (KeyUtil.isKey(event, 'ArrowUp')) {
            this.stepInput.increase();
            this._muteEvent(event);
        }
        if (KeyUtil.isKey(event, 'ArrowDown')) {
            this.stepInput.decrease();
            this._muteEvent(event);
        }
        if (KeyUtil.isKey(event, 'PageUp')) {
            this.stepInput.largeStepIncrease();
            this._muteEvent(event);
        }
        if (KeyUtil.isKey(event, 'PageDown')) {
            this.stepInput.largeStepDecrease();
            this._muteEvent(event);
        }
    }

    /**
     * @hidden
     * Handle mouse wheel
     */
    @HostListener('wheel', ['$event'])
    onMouseWheel(event: WheelEvent): void {
        if (!this.stepInput._canChangeValue || !this.stepInput.focused) {
            return;
        }
        event.preventDefault();
        if (event.deltaY > 0) {
            this.stepInput.decrease();
        } else {
            this.stepInput.increase();
        }
    }

    /**
     * @hidden
     * Mute event
     */
    private _muteEvent(e: Event) {
        e.stopPropagation();
        e.preventDefault();
    }
}

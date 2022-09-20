import { Directive, HostListener, SkipSelf } from '@angular/core';
import { DOWN_ARROW, PAGE_DOWN, PAGE_UP, UP_ARROW } from '@angular/cdk/keycodes';

import { KeyUtil } from '@fundamental-ngx/core/utils';
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
     * Handle "input" event to keep track of what user is entering
     */
    @HostListener('input', ['$event'])
    onInput(event: InputEvent): void {
        if (!this.stepInput.canChangeValue) {
            return;
        }

        const value: string = ((event.target as HTMLInputElement).value || '').trim();
        this.stepInput.onEnterValue(value);
    }

    /**
     * @hidden
     * Handle "change" event to commit entered value
     */
    @HostListener('change')
    onChange(): void {
        if (!this.stepInput.canChangeValue) {
            return;
        }
        this.stepInput.commitEnteredValue();
    }

    /**
     * @hidden
     * Handle "focus" event
     */
    @HostListener('focus')
    onFocus(): void {
        this.stepInput.onFocus();
    }

    /**
     * @hidden
     * Handle "blur" event
     */
    @HostListener('focusout')
    onBlur(): void {
        this.stepInput.onBlur();
    }

    /**
     * @hidden
     * Handle "keydown" event
     */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (!this.stepInput.canChangeValue) {
            return;
        }
        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            this.stepInput.increase();
            this._muteEvent(event);
        }
        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            this.stepInput.decrease();
            this._muteEvent(event);
        }
        if (KeyUtil.isKeyCode(event, PAGE_UP)) {
            this.stepInput.largeStepIncrease();
            this._muteEvent(event);
        }
        if (KeyUtil.isKeyCode(event, PAGE_DOWN)) {
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
        if (!this.stepInput.canChangeValue || !this.stepInput.focused) {
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
    private _muteEvent(e: Event): void {
        e.stopPropagation();
        e.preventDefault();
    }
}

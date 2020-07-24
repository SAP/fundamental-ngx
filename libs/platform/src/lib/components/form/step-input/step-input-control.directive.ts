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
    constructor(@SkipSelf() private stepInputCmp: StepInputComponent) {}

    /**
     * @hidden
     * Handle "change" event
     */
    @HostListener('change', ['$event'])
    onChange() {
        const value: string = (event.target as HTMLInputElement).value;
        this.stepInputCmp.commitEnteredValue(value);
        this.stepInputCmp.detectChanges();
    }

    /**
     * @hidden
     * Handle "focus" event
     */
    @HostListener('focus')
    onFocus() {
        this.stepInputCmp._onFocusChanged(true);
        this.stepInputCmp.detectChanges();
    }

    /**
     * @hidden
     * Handle "blur" event
     */
    @HostListener('blur')
    onBlur() {
        this.stepInputCmp._onFocusChanged(false);
        this.stepInputCmp.detectChanges();
    }

    /**
     * @hidden
     * Handle "keydown" event
     */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (KeyUtil.isKey(event, 'ArrowUp')) {
            this.stepInputCmp.increase();
            this._muteEvent(event);
        }
        if (KeyUtil.isKey(event, 'ArrowDown')) {
            this.stepInputCmp.decrease();
            this._muteEvent(event);
        }
        if (KeyUtil.isKey(event, 'PageUp')) {
            this.stepInputCmp.largeStepIncrease();
            this._muteEvent(event);
        }
        if (KeyUtil.isKey(event, 'PageDown')) {
            this.stepInputCmp.largeStepDecrease();
            this._muteEvent(event);
        }
    }

    /**
     * @hidden
     * Handle mouse wheel
     */
    @HostListener('wheel', ['$event'])
    onMouseWheel(event: WheelEvent): void {
        event.preventDefault();
        if (event.deltaY > 0) {
            this.stepInputCmp.decrease();
        } else {
            this.stepInputCmp.increase();
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

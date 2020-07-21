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

    /** @hidden handle "change" event */
    @HostListener('change')
    onChange() {
        this.stepInputCmp.commitEnteredValue();
    }

    /** @hidden handle "input" event */
    @HostListener('input', ['$event'])
    onInput(event: KeyboardEvent) {
        const value: string = (event.target as HTMLInputElement).value;
        this.stepInputCmp.onInput(value);
    }

    /** @hidden handle "focus" event */
    @HostListener('focus')
    onFocus() {
        this.stepInputCmp._onFocusChanged(true);
    }

    /** @hidden handle "blur" event */
    @HostListener('blur')
    onBlur() {
        this.stepInputCmp._onFocusChanged(false);
    }

    /** @hidden handle "keydown" event */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        const muteEvent = (e: KeyboardEvent) => {
            e.stopPropagation();
            e.preventDefault();
        };

        if (KeyUtil.isKey(event, 'ArrowUp')) {
            this.stepInputCmp.increase();
            muteEvent(event);
        } else if (KeyUtil.isKey(event, 'ArrowDown')) {
            this.stepInputCmp.decrease();
            muteEvent(event);
        }
    }

    /** @hidden handle mouse wheel */
    @HostListener('keydown', ['$event'])
    onMouseWheel(event: WheelEvent): void {
        event.preventDefault();
        if (event.deltaY > 0) {
            this.stepInputCmp.decrease();
        } else {
            this.stepInputCmp.increase();
        }
    }
}

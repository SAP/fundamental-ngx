import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Injectable, Optional, QueryList } from '@angular/core';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { COMPLETED_STEP_STATUS, CURRENT_STEP_STATUS } from './constants';

@Injectable()
export class WizardService {
    /** @hidden */
    constructor(@Optional() private _rtlService: RtlService) {}

    /** @hidden */
    progressBarKeyHandler(event: any, steps: QueryList<WizardStepComponent>, index: number): void {
        const rtlDirection: boolean = this._rtlService && this._rtlService.rtl.getValue();
        if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            if (
                steps.get(index - 1)?.status === COMPLETED_STEP_STATUS ||
                steps.get(index - 1)?.status === CURRENT_STEP_STATUS
            ) {
                if (!rtlDirection) {
                    this._focusPrevious(index, steps);
                } else {
                    this._focusNext(index, steps);
                }
            }
        } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            if (steps.get(index)?.status === COMPLETED_STEP_STATUS) {
                if (!rtlDirection) {
                    this._focusNext(index, steps);
                } else {
                    this._focusPrevious(index, steps);
                }
            }
        }
    }

    /** @hidden */
    private _focusNext(index: number, steps: QueryList<WizardStepComponent>): void {
        if (index + 1 < steps.length) {
            steps.get(index + 1)?.progressBarLink.nativeElement.focus();
        } else {
            steps.get(0)?.progressBarLink.nativeElement.focus();
        }
    }

    /** @hidden */
    private _focusPrevious(index: number, steps: QueryList<WizardStepComponent>): void {
        if (index - 1 >= 0) {
            steps.get(index - 1)?.progressBarLink.nativeElement.focus();
        } else {
            steps.get(steps.length - 1)?.progressBarLink.nativeElement.focus();
        }
    }
}

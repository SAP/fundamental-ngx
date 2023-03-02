import { Directive, ElementRef } from '@angular/core';
import { DisabledViewModifier, FdkDisabledProvider } from '@fundamental-ngx/cdk/utils';

@Directive({
    selector: '[fdDisabledRecipient]',
    providers: [FdkDisabledProvider]
})
export class DisabledRecipientDirective implements DisabledViewModifier {
    constructor(private _disabled$: FdkDisabledProvider, private _elementRef: ElementRef) {
        this._disabled$.addViewModifier(this);
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this._elementRef.nativeElement.classList.add('is_very_disabled');
        } else {
            this._elementRef.nativeElement.classList.remove('is_very_disabled');
        }
    }
}

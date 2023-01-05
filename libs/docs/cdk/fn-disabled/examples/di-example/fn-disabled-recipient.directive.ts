import { Directive, ElementRef } from '@angular/core';
import { DisabledViewModifier, FdkDisabledProvider } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdkDisabledRecipient]',
    providers: [FdkDisabledProvider]
})
export class fdkDisabledRecipientDirective implements DisabledViewModifier {
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

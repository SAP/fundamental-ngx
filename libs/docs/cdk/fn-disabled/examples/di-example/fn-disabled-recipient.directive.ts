import { Directive, ElementRef } from '@angular/core';
import { DisabledViewModifier, FnDisabledProvider } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fnDisabledRecipient]',
    providers: [FnDisabledProvider]
})
export class FnDisabledRecipientDirective implements DisabledViewModifier {
    constructor(private _disabled$: FnDisabledProvider, private _elementRef: ElementRef) {
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

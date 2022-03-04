import { Component, Directive, ElementRef, Self } from '@angular/core';
import { DisabledViewModifier, FnDisabledProvider } from '@fundamental-ngx/fn/cdk';

@Component({
    selector: 'fundamental-ngx-fn-disabled-di-example',
    templateUrl: './di-example.component.html'
})
export class DiExampleComponent {
    rootElementDisabled = false;
    firstElementDisabled = false;

    constructor() {}
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fnDisabledRecipient]',
    providers: [FnDisabledProvider]
})
export class FnDisabledRecipientDirective implements DisabledViewModifier {
    constructor(@Self() private _disabled$: FnDisabledProvider, private _elementRef: ElementRef) {
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

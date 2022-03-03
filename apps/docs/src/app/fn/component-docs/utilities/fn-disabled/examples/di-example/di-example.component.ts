import { Component, Directive, ElementRef } from '@angular/core';
import { DisabledViewModifier, FnDisabledProvider } from '@fundamental-ngx/fn/cdk';

@Component({
    selector: 'fundamental-ngx-fn-disabled-di-example',
    templateUrl: './di-example.component.html'
})
export class DiExampleComponent {
    constructor() {}
}

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
        // console.log({ fromRecipientDirective: isDisabled, element: this._elementRef.nativeElement });
    }
}

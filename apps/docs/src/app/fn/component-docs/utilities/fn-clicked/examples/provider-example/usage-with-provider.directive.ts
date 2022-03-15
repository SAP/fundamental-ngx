import { Directive, Output } from '@angular/core';
import { FnClickedProvider } from '@fundamental-ngx/fn/cdk';
import { Observable } from 'rxjs';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fnClickedUsageWithProvider]',
    providers: [FnClickedProvider]
})
export class UsageWithProviderDirective {
    @Output() anyOutputName: Observable<MouseEvent | KeyboardEvent>;

    constructor(_clicked: FnClickedProvider) {
        this.anyOutputName = _clicked;
    }
}

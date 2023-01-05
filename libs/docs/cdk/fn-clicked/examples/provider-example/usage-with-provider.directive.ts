import { Directive, Output } from '@angular/core';
import { FdkClickedProvider } from '@fundamental-ngx/cdk/utils';
import { Observable } from 'rxjs';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fnClickedUsageWithProvider]',
    providers: [FdkClickedProvider]
})
export class UsageWithProviderDirective {
    @Output() anyOutputName: Observable<MouseEvent | KeyboardEvent>;

    constructor(_clicked: FdkClickedProvider) {
        this.anyOutputName = _clicked;
    }
}

import { Directive, Output } from '@angular/core';
import { FdkClickedProvider } from '@fundamental-ngx/cdk/utils';
import { Observable } from 'rxjs';

@Directive({
    selector: '[fdClickedUsageWithProvider]',
    providers: [FdkClickedProvider]
})
export class UsageWithProviderDirective {
    @Output() anyOutputName: Observable<MouseEvent | KeyboardEvent>;

    constructor(_clicked: FdkClickedProvider) {
        this.anyOutputName = _clicked;
    }
}

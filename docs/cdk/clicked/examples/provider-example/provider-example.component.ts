import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { UsageWithProviderDirective } from './usage-with-provider.directive';

@Component({
    selector: 'fd-clicked-provider-example',
    templateUrl: './provider-example.component.html',
    standalone: true,
    imports: [UsageWithProviderDirective, FocusableItemDirective, NgIf, JsonPipe]
})
export class ProviderExampleComponent {
    fdClickEvent: any;
}

import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { UsageWithProviderDirective } from './usage-with-provider.directive';

@Component({
    selector: 'fdk-clicked-provider-example',
    templateUrl: './provider-example.component.html',
    imports: [UsageWithProviderDirective, FocusableItemDirective, JsonPipe]
})
export class ProviderExampleComponent {
    fdClickEvent: any;
}

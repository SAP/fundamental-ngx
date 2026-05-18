import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';

@Component({
    selector: 'fd-inline-help-trigger-example',
    templateUrl: './inline-help-trigger-example.component.html',
    imports: [ButtonComponent, InlineHelpModule]
})
export class InlineHelpTriggerExampleComponent {
    /** CDK scroll strategy that closes the overlay when an ancestor scrolls. */
    readonly closeOnScroll: ScrollStrategy = inject(Overlay).scrollStrategies.close();
}

import { Component } from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';

@Component({
    selector: 'fd-message-page-error-example',
    templateUrl: './message-page-error-example.component.html',
    imports: [MessagePageModule, LinkComponent]
})
export class MessagePageErrorExampleComponent {}

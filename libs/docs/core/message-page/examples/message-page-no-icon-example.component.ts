import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';

@Component({
    selector: 'fd-message-page-no-icon-example',
    templateUrl: './message-page-no-icon-example.component.html',
    imports: [MessagePageModule, ButtonComponent, ContentDensityDirective]
})
export class MessagePageNoIconExampleComponent {}

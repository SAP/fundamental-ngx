import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { IllustratedMessageModule, SvgConfig } from '@fundamental-ngx/core/illustrated-message';

@Component({
    selector: 'fd-illustrated-message-dot-example',
    templateUrl: './illustrated-message-dot-example.component.html',
    imports: [CardModule, IllustratedMessageModule, ButtonComponent]
})
export class IllustratedMessageDotExampleComponent {
    spotConfig: SvgConfig = {
        dot: { url: 'assets/images/sapIllus-Ice-Cream-Demo-ExtraSmall.svg', id: 'sapIllus-Ice-Cream-Demo-ExtraSmall' }
    };
}

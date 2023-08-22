import { Component } from '@angular/core';
import { SvgConfig } from '@fundamental-ngx/core/illustrated-message';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-illustrated-message-dot-example',
    templateUrl: './illustrated-message-dot-example.component.html',
    standalone: true,
    imports: [CardModule, IllustratedMessageModule, ButtonModule]
})
export class IllustratedMessageDotExampleComponent {
    spotConfig: SvgConfig = {
        dot: { url: 'assets/images/sapIllus-Spot-NoMail.svg', id: 'sapIllus-Spot-NoEmail' }
    };
}

import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-illustrated-message-spot-example',
    templateUrl: './illustrated-message-spot-example.component.html',
    standalone: true,
    imports: [CardModule, IllustratedMessageModule, ButtonModule]
})
export class IllustratedMessageSpotExampleComponent {
    spotConfig = {
        spot: { url: 'assets/images/sapIllus-Spot-NoMail.svg', id: 'sapIllus-Spot-NoEmail' }
    };
}

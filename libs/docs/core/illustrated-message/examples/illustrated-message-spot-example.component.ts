import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';

@Component({
    selector: 'fd-illustrated-message-spot-example',
    templateUrl: './illustrated-message-spot-example.component.html',
    imports: [CardModule, IllustratedMessageModule, ButtonComponent]
})
export class IllustratedMessageSpotExampleComponent {
    spotConfig = {
        spot: { url: 'assets/images/sapIllus-Spot-NoMail.svg', id: 'sapIllus-Spot-NoEmail' },
        dot: { url: 'assets/images/sapIllus-Spot-NoMail.svg', id: 'sapIllus-Spot-NoEmail' }
    };
}

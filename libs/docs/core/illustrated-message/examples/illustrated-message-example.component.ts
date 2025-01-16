import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';

@Component({
    selector: 'fd-illustrated-message-example',
    templateUrl: './illustrated-message-example.component.html',
    imports: [IllustratedMessageModule, ButtonComponent]
})
export class IllustratedMessageExampleComponent {
    sceneConfig = {
        scene: { url: 'assets/images/sapIllus-Scene-NoMail.svg', id: 'sapIllus-Scene-NoMail-1' },
        dialog: { url: 'assets/images/sapIllus-Dialog-NoMail.svg', id: 'sapIllus-Dialog-NoMail' },
        spot: { url: 'assets/images/sapIllus-Spot-NoMail.svg', id: 'sapIllus-Spot-NoEmail' },
        dot: { url: 'assets/images/sapIllus-Spot-NoMail.svg', id: 'sapIllus-Spot-NoEmail' }
    };
}

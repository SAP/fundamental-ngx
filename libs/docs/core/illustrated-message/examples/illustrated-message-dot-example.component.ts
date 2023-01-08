import { Component } from '@angular/core';
import { SvgConfig } from '@fundamental-ngx/core/illustrated-message';

@Component({
    selector: 'fd-illustrated-message-dot-example',
    templateUrl: './illustrated-message-dot-example.component.html'
})
export class IllustratedMessageDotExampleComponent {
    spotConfig: SvgConfig = {
        dot: { url: 'assets/images/sapIllus-Spot-NoMail.svg', id: 'sapIllus-Spot-NoEmail' }
    };
}

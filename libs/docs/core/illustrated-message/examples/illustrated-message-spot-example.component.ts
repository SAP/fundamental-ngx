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
        spot: {
            url: 'assets/images/sapIllus-Phone-with-Icon-Demo-Small.svg',
            id: 'sapIllus-Phone-with-Icon-Demo-Small'
        },
        dot: { url: 'assets/images/sapIllus-Ice-Cream-Demo-ExtraSmall.svg', id: 'sapIllus-Ice-Cream-Demo-ExtraSmall' }
    };
}

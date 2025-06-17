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
    smallConfig = {
        small: { url: 'assets/images/sapIllus-UnknownFolder-Demo-Small.svg', id: 'sapIllus-UnknownFolder-Demo-Small' },
        xsmall: {
            url: 'assets/images/sapIllus-UnknownFolder-Demo-ExtraSmall.svg',
            id: 'sapIllus-UnknownFolder-Demo-ExtraSmall'
        }
    };

    smallConfigInbox = {
        small: {
            url: 'assets/images/sapIllus-Phone-with-Icon-Demo-Small.svg',
            id: 'sapIllus-Phone-with-Icon-Demo-Small'
        },
        xsmall: {
            url: 'assets/images/sapIllus-Phone-with-Icon-Demo-ExtraSmall.svg',
            id: 'sapIllus-Phone-with-Icon-Demo-ExtraSmall'
        }
    };
}

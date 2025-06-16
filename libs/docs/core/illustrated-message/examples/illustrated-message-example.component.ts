import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';

@Component({
    selector: 'fd-illustrated-message-example',
    templateUrl: './illustrated-message-example.component.html',
    imports: [IllustratedMessageModule, ButtonComponent]
})
export class IllustratedMessageExampleComponent {
    largeConfig = {
        large: { url: 'assets/images/sapIllus-Ice-Cream-Demo-Largev2.svg', id: 'sapIllus-Ice-Cream-Demo-Largev2' },
        medium: { url: 'assets/images/sapIllus-Ice-Cream-Demo-Medium.svg', id: 'sapIllus-Ice-Cream-Demo-Medium' },
        small: { url: 'assets/images/sapIllus-Ice-Cream-Demo-Small.svg', id: 'sapIllus-Ice-Cream-Demo-Small' },
        xsmall: {
            url: 'assets/images/sapIllus-Ice-Cream-Demo-ExtraSmall.svg',
            id: 'sapIllus-Ice-Cream-Demo-ExtraSmall'
        }
    };
}

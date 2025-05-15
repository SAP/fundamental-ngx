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
        scene: { url: 'assets/images/sapIllus-Ice-Cream-Demo-Large.svg', id: 'sapIllus-Ice-Cream-Demo-Large' },
        dialog: {
            url: 'assets/images/sapIllus-UnknownFolder-Demo-Medium.svg',
            id: 'sapIllus-UnknownFolder-Demo-Medium'
        },
        spot: {
            url: 'assets/images/sapIllus-Phone-with-Icon-Demo-Small.svg',
            id: 'sapIllus-Phone-with-Icon-Demo-Small'
        },
        dot: { url: 'assets/images/sapIllus-Ice-Cream-Demo-ExtraSmall.svg', id: 'sapIllus-Ice-Cream-Demo-ExtraSmall' }
    };
}

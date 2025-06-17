import { Component } from '@angular/core';
import { CardModule } from '@fundamental-ngx/core/card';
import { IllustratedMessageModule, SvgConfig } from '@fundamental-ngx/core/illustrated-message';

@Component({
    selector: 'fd-illustrated-message-dot-example',
    templateUrl: './illustrated-message-dot-example.component.html',
    imports: [CardModule, IllustratedMessageModule]
})
export class IllustratedMessageDotExampleComponent {
    xsmallConfig: SvgConfig = {
        xsmall: {
            url: 'assets/images/sapIllus-Ice-Cream-Demo-ExtraSmall.svg',
            id: 'sapIllus-Ice-Cream-Demo-ExtraSmall'
        }
    };
}

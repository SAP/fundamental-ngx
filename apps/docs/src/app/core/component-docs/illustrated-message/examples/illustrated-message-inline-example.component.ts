import { Component } from '@angular/core';
import { SvgConfig } from '@fundamental-ngx/core/illustrated-message';
import sceneSvg from '!../../../../../assets/images/sapIllus-Scene-NoMail.svg?raw';
import dialogSvg from '!../../../../../assets/images/sapIllus-Dialog-NoMail.svg?raw';

@Component({
    selector: 'fd-illustrated-message-inline-example',
    templateUrl: './illustrated-message-inline-example.component.html'
})
export class IllustratedMessageInlineExampleComponent {
    sceneConfig: SvgConfig = {
        scene: { file: sceneSvg, id: 'sapIllus-Scene-NoMail-1' },
        dialog: { file: dialogSvg, id: 'sapIllus-Dialog-NoMail' }
    };
}

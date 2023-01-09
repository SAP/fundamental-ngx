import { AfterViewInit, Component } from '@angular/core';
import { SvgConfig } from '@fundamental-ngx/core/illustrated-message';
import { getAsset } from '@fundamental-ngx/docs/shared';

const sceneSvg = 'assets/images/sapIllus-Scene-NoMail.svg';
const dialogSvg = 'assets/images/sapIllus-Dialog-NoMail.svg';

@Component({
    selector: 'fd-illustrated-message-inline-example',
    templateUrl: './illustrated-message-inline-example.component.html'
})
export class IllustratedMessageInlineExampleComponent implements AfterViewInit {
    sceneConfig: SvgConfig;

    async ngAfterViewInit() {
        this.sceneConfig = {
            scene: { file: await getAsset(sceneSvg), id: 'sapIllus-Scene-NoMail-1' },
            dialog: { file: await getAsset(dialogSvg), id: 'sapIllus-Dialog-NoMail' }
        };
    }
}

import { AfterViewInit, Component } from '@angular/core';
import { SvgConfig } from '@fundamental-ngx/core/illustrated-message';
import { getAsset } from '@fundamental-ngx/docs/shared';
import { zip } from 'rxjs';

const sceneSvg = 'assets/images/sapIllus-Scene-NoMail.svg';
const dialogSvg = 'assets/images/sapIllus-Dialog-NoMail.svg';

@Component({
    selector: 'fd-illustrated-message-inline-example',
    templateUrl: './illustrated-message-inline-example.component.html'
})
export class IllustratedMessageInlineExampleComponent implements AfterViewInit {
    sceneConfig: SvgConfig;

    async ngAfterViewInit() {
        zip(getAsset(sceneSvg), getAsset(dialogSvg)).subscribe(([scene, dialog]) => {
            this.sceneConfig = {
                scene: { file: scene, id: 'sapIllus-Scene-NoMail-1' },
                dialog: { file: dialog, id: 'sapIllus-Dialog-NoMail' }
            };
        });
    }
}

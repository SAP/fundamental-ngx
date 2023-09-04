import { AfterViewInit, Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IllustratedMessageModule, SvgConfig } from '@fundamental-ngx/core/illustrated-message';
import { getAsset } from '@fundamental-ngx/docs/shared';
import { zip } from 'rxjs';

const sceneSvg = 'assets/images/sapIllus-Scene-NoMail.svg';
const dialogSvg = 'assets/images/sapIllus-Dialog-NoMail.svg';

@Component({
    selector: 'fd-illustrated-message-inline-example',
    templateUrl: './illustrated-message-inline-example.component.html',
    standalone: true,
    imports: [IllustratedMessageModule, ButtonModule]
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

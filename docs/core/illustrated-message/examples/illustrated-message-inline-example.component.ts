import { AfterViewInit, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IllustratedMessageModule, SvgConfig } from '@fundamental-ngx/core/illustrated-message';
import { getAsset } from '@fundamental-ngx/docs/shared';
import { zip } from 'rxjs';

const sceneSvg = 'assets/images/sapIllus-Scene-NoMail.svg';
const dialogSvg = 'assets/images/sapIllus-Dialog-NoMail.svg';

@Component({
    selector: 'fd-illustrated-message-inline-example',
    templateUrl: './illustrated-message-inline-example.component.html',
    standalone: true,
    imports: [IllustratedMessageModule, ButtonComponent]
})
export class IllustratedMessageInlineExampleComponent implements AfterViewInit {
    sceneConfig: SvgConfig;
    assets = [getAsset(sceneSvg), getAsset(dialogSvg)];

    async ngAfterViewInit() {
        zip(...this.assets).subscribe(([scene, dialog]) => {
            this.sceneConfig = {
                scene: { file: scene, id: 'sapIllus-Scene-NoMail-1' },
                dialog: { file: dialog, id: 'sapIllus-Dialog-NoMail' }
            };
        });
    }
}

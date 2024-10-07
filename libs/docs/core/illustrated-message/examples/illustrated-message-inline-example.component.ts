import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IllustratedMessageModule, SvgConfig } from '@fundamental-ngx/core/illustrated-message';
import { Observable, map, zip } from 'rxjs';

const sceneSvg = 'assets/images/sapIllus-Scene-NoMail.svg';
const dialogSvg = 'assets/images/sapIllus-Dialog-NoMail.svg';
const spotSvg = 'assets/images/sapIllus-Spot-NoMail.svg';
const dotSvg = 'assets/images/sapIllus-Spot-NoMail.svg';

const getAsset = (path: string): Observable<string> =>
    inject(HttpClient)
        .get(path, {
            responseType: 'text',
            headers: {
                accept: 'text/html'
            }
        })
        .pipe(map((r) => r.trim()));

@Component({
    selector: 'fd-illustrated-message-inline-example',
    templateUrl: './illustrated-message-inline-example.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IllustratedMessageModule, ButtonComponent, HttpClientModule]
})
export class IllustratedMessageInlineExampleComponent implements AfterViewInit {
    sceneConfig: WritableSignal<SvgConfig> = signal({});
    assets = [getAsset(sceneSvg), getAsset(dialogSvg), getAsset(spotSvg), getAsset(dotSvg)];

    ngAfterViewInit() {
        zip(...this.assets).subscribe(([scene, dialog, spot, dot]) => {
            this.sceneConfig.set({
                scene: { file: scene, id: 'sapIllus-Scene-NoMail-1' },
                dialog: { file: dialog, id: 'sapIllus-Dialog-NoMail' },
                spot: { file: spot, id: 'sapIllus-Spot-NoEmail' },
                dot: { file: dot, id: 'sapIllus-Spot-NoEmail' }
            });
        });
    }
}

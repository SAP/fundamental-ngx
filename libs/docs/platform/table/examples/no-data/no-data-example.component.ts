import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import {
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';

import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';

@Component({
    selector: 'fdp-platform-table-no-data-example',
    templateUrl: './no-data-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective,
        PlatformButtonModule,
        IllustratedMessageModule
    ]
})
export class NoDataExampleComponent {
    source;

    constructor(readonly hostElement: ElementRef<HTMLElement>) {
        this.source = [];
    }

    sceneConfig = {
        scene: {
            url: 'assets/images/sapIllus-Scene-NoMail.svg',
            id: 'sapIllus-Scene-NoMail-1'
        },
        dialog: {
            url: 'assets/images/sapIllus-Dialog-NoMail.svg',
            id: 'sapIllus-Dialog-NoMail'
        },
        base: {
            url: 'assets/images/sapIllus-Dialog-NoMail.svg',
            id: 'sapIllus-Dialog-NoMail'
        },
        spot: {
            url: 'assets/images/sapIllus-Spot-NoMail.svg',
            id: 'sapIllus-Spot-NoEmail'
        },
        dot: {
            url: 'assets/images/sapIllus-Spot-NoMail.svg',
            id: 'sapIllus-Spot-NoEmail'
        }
    };
}

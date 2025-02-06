import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fdp-platform-table-no-data-example',
    templateUrl: './no-data-example.component.html',
    imports: [TableModule, LinkComponent, IconComponent, IllustratedMessageModule]
})
export class NoDataExampleComponent {
    tableRows = [];

    sceneConfig = {
        scene: {
            url: 'assets/images/sapIllus-Scene-NoMail.svg',
            id: 'sapIllus-Scene-NoMail-1'
        },
        dialog: {
            url: 'assets/images/sapIllus-Dialog-NoMail.svg',
            id: 'sapIllus-Dialog-NoMail'
        }
    };
}

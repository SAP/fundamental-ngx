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
            url: 'assets/images/sapIllus-Ice-Cream-Demo-Large.svg',
            id: 'sapIllus-Ice-Cream-Demo-Large'
        },
        dialog: {
            url: 'assets/images/sapIllus-UnknownFolder-Demo-Medium.svg',
            id: 'sapIllus-UnknownFolder-Demo-Medium'
        }
    };
}

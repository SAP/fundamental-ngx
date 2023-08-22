import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FdDate } from '@fundamental-ngx/core/datetime';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { TableInitialStateDirective } from '@fundamental-ngx/platform/table-helpers';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { TableHeaderResizerDirective } from '@fundamental-ngx/platform/table-helpers';
import { TableDataSourceDirective } from '@fundamental-ngx/platform/table-helpers';

@Component({
    selector: 'fdp-platform-table-no-items-template-example',
    templateUrl: './platform-table-no-items-template-example.component.html',
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
export class PlatformTableNoItemsTemplateExampleComponent {
    source = [];

    sceneConfig = {
        scene: { url: 'assets/images/sapIllus-Scene-NoMail.svg', id: 'sapIllus-Scene-NoMail-1' },
        dialog: { url: 'assets/images/sapIllus-Dialog-NoMail.svg', id: 'sapIllus-Dialog-NoMail' }
    };

    alert(message: string): void {
        alert(message);
    }
}

export interface ExampleItem {
    name: string;
    description: string;
    price: {
        value: number;
        currency: string;
    };
    status: string;
    statusColor?: string;
    date: FdDate;
    verified: boolean;
}

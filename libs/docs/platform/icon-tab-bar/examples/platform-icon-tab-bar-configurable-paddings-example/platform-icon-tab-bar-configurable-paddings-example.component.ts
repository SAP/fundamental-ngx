import { Component } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { textTypeConfig } from '../config-for-examples/text-type.config';
import { PlatformIconTabBarModule } from '@fundamental-ngx/platform/icon-tab-bar';

@Component({
    selector: 'fd-platform-icon-tab-bar-configurable-paddings-example',
    templateUrl: './platform-icon-tab-bar-configurable-paddings-example.component.html',
    styles: [
        `
            div {
                padding: 5px;
                background: var(--sapObjectHeader_Background);
            }
        `
    ],
    standalone: true,
    imports: [PlatformIconTabBarModule]
})
export class PlatformIconTabBarConfigurablePaddingsExampleComponent {
    itemsForSmExample = cloneDeep(textTypeConfig);
    itemsForLgExample = cloneDeep(textTypeConfig);
    itemsForXlExample = cloneDeep(textTypeConfig);
    itemsForResponsiveExample = cloneDeep(textTypeConfig);
}

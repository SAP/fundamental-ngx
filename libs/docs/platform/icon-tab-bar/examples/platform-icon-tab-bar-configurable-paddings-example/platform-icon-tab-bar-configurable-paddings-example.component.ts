import { Component } from '@angular/core';
import { IconTabBarComponent } from '@fundamental-ngx/platform/icon-tab-bar';
import { cloneDeep } from 'lodash-es';
import { textTypeConfig } from '../config-for-examples/text-type.config';

@Component({
    selector: 'fdp-platform-icon-tab-bar-configurable-paddings-example',
    templateUrl: './platform-icon-tab-bar-configurable-paddings-example.component.html',
    styles: [
        `
            div {
                padding: 5px;
                background: var(--sapObjectHeader_Background);
            }
        `
    ],
    imports: [IconTabBarComponent]
})
export class PlatformIconTabBarConfigurablePaddingsExampleComponent {
    itemsForSmExample = cloneDeep(textTypeConfig);
    itemsForLgExample = cloneDeep(textTypeConfig);
    itemsForXlExample = cloneDeep(textTypeConfig);
    itemsForResponsiveExample = cloneDeep(textTypeConfig);
}
